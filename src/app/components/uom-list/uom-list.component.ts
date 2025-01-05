import { MainCommunicationService } from "./../../services/main-communication.service";
import { title } from "process";
import { UomService } from "./../../services/uom.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { TableComponent } from "../shared/table/table.component";
import pdfAttachment from "@ui5/webcomponents-icons/pdf-attachment.js";
import excelAttachment from "@ui5/webcomponents-icons/excel-attachment.js";
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TableHeader, TableKey, TableRow } from "../../types/table-types";
// import download from "@ui5/webcomponents-icons/download.js";

@Component({
    selector: "app-uom-list",
    templateUrl: "./uom-list.component.html",
    styleUrl: "./uom-list.component.css",
})
export class UomListComponent implements OnInit {
    @ViewChild("fileInput")
    fileInput: any;

    //list options
    searchValue: string = "";
    ascending: boolean = true;
    sortBy: string | undefined = undefined;
    //table
    headers: TableHeader[] = [
        { name: "UOM ID", minWidth: "88px" },
        { name: "UOM Name", minWidth: "88px" },
        { name: "Description", minWidth: "124px" },
        { name: "UOM Long Name", minWidth: "165px" },
        { name: "UOM Short Name", minWidth: "165px" },
        { name: "Weight (KG)", minWidth: "88px" },
        { name: "Bulk Code", minWidth: "88px" },
    ];

    keys = [
        { name: "id" },
        { name: "name" },
        { name: "description" },
        { name: "longName" },
        { name: "shortName" },
        { name: "weightKG" },
        { name: "bulkCode" },
    ] as TableKey[];
    rows = [] as TableRow[];
    error: boolean = false;
    loading: boolean = true;

    //subheader buttons
    subheaderButtons = [
        { name: "Create New UOM", classInp: "UOM", style: "green" },
        { name: "Create New PU", classInp: "PU", style: "blue" },
        { name: "Create New HU", classInp: "HU", style: "orange" },
    ];

    //icons
    pdfAttachment = pdfAttachment;
    excelAttachment = excelAttachment;
    // download = download;

    constructor(
        private UOMService: UomService,
        private router: Router,
        private mainCommunicationService: MainCommunicationService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.fetchUOMs();
    }

    //temporary default paginator props
    paginatorProps = {
        length: 100,
        pageSize: 50,
        pageIndex: 0,
        pageSizeOptions: [10, 20, 30, 40, 50],
        hidePageSize: false,
        showPageSizeOptions: true,
        showFirstLastButtons: true,
        disabled: false,
    };

    handlePageEvent(e: PageEvent) {
        this.paginatorProps.length = e.length;
        this.paginatorProps.pageSize = e.pageSize;
        this.paginatorProps.pageIndex = e.pageIndex;
        this.fetchUOMs();
    }

    fetchUOMs() {
        this.loading = true;
        this.UOMService.fetchUOMs(
            this.paginatorProps.pageIndex,
            this.paginatorProps.pageSize,
            this.ascending,
            this.searchValue,
            "ACTIVE",
            this.sortBy
        ).subscribe({
            next: (response) => {
                if (response.status == 200) {
                    // console.log(response);
                    let rows = response.body.content;
                    this.paginatorProps.length = response.body.totalElements;
                    this.rows = rows.map((element: any) => {
                        element.weightKG = 0;
                        element.measuredValues.filter((elt: any) => {
                            if (elt.metricSystem == "SI")
                                element.weightKG = elt.weightValue;
                        }).weightValue;
                        return element;
                    });

                    this.loading = false;
                }
            },
            error: () => {
                this.error = true;
            },
        });
    }

    search(searchValue: string) {
        this.searchValue = searchValue;
        this.fetchUOMs();
    }

    viewUOMDetails(event: any) {
        this.router.navigate(["uom-details", event.id]);
    }

    navigateToCreateUOMForm(classInp: string) {
        this.router.navigate(["create-new-uom"], {
            queryParams: { class: classInp },
        });
    }
    triggerFileInput() {
        this.fileInput.nativeElement.click();
    }
    uploadFile(event: any) {
        let file: File = event.target?.files[0];
        this.UOMService.uploadUOM(file).subscribe({
            next: (response) => {
                console.log(response);
                file.text().then((data) => {
                    console.log(data);
                });
                if (response.status == 200) {
                    this.snackBar.openFromComponent(SnackbarComponent, {
                        data: {
                            message: "UOM uploaded successfully",
                            error: false,
                        },
                        duration: 2000,
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        panelClass: ["success-snackbar"],
                    });
                }
            },
            error: (err) => {
                console.log(err);
                this.snackBar.openFromComponent(SnackbarComponent, {
                    data: { message: "UOM upload failed", error: true },
                    duration: 2000,
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    panelClass: ["error-snackbar"],
                });
            },
        });
    }

    onRefresh() {
        this.paginatorProps.pageIndex = 0;
        this.searchValue = "";
        this.ascending = true;
        this.sortBy = "id";
        this.fetchUOMs();
    }

    downloadUOM(type: string) {
        this.UOMService.downloadUOM(type).subscribe({
            next: (response) => {
                console.log(response);
                if (response.status == 200) {
                    this.onDownloadStart();
                    let filename = `${new Date()
                        .toISOString()
                        .slice(0, 10)
                        .replace(/-/g, "")}-${new Date()
                        .toLocaleTimeString("en-US", { hour12: false })
                        .slice(0, 5)
                        .replace(":", ".")}-UOM_List.${type.toLowerCase()}`;

                    const contentDisposition = response.headers.get(
                        "Content-Disposition"
                    );
                    if (contentDisposition) {
                        // Extract filename from Content-Disposition header if available
                        const match =
                            contentDisposition.match(/filename="(.+?)"/);
                        if (match && match[1]) {
                            filename = match[1];
                        }
                    }
                    this.saveAsFileFromBlob(response.body, filename, type);
                }
            },
        });
    }

    saveAsFileFromBlob(blob: any, filename: string, type: string) {
        if (blob) {
            const newBlob = new Blob([blob], {
                type:
                    type === "csv"
                        ? "text/csv;charset=utf-8;"
                        : "application/pdf",
            });

            const url = window.URL.createObjectURL(newBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    }

    onDownloadStart() {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: { message: "Downloading....Please wait", error: false },
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["success-snackbar"],
        });
    }

    onSortChange(event: any) {
        this.ascending = event.direction === "asc" || event.direction === "";
        this.sortBy = event.direction === "" ? "id" : event.active;
        if (this.sortBy == "name") this.sortBy = "type";
        this.fetchUOMs();
    }
}
