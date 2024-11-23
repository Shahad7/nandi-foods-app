import { MainCommunicationService } from "./../../services/main-communication.service";
import { title } from "process";
import { UomService } from "./../../services/uom.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { TableComponent } from "../shared/table/table.component";
import { log } from "console";

@Component({
    selector: "app-uom-list",
    templateUrl: "./uom-list.component.html",
    styleUrl: "./uom-list.component.css",
})
export class UomListComponent implements OnInit {
    @ViewChild("fileInput")
    fileInput: any;
    headers = [
        { name: "UOM ID", minWidth: "88px" },
        { name: "UOM Name", minWidth: "88px" },
        { name: "Description", minWidth: "88px" },
        { name: "UOM Long Name", minWidth: "165px" },
        { name: "UOM Short Name", minWidth: "165px" },
        { name: "Weight (KG)", minWidth: "88px" },
        { name: "Bulk Code", minWidth: "88px" },
    ];

    keys = [
        "id",
        "name",
        "description",
        "longName",
        "shortName",
        "weightKG",
        "bulkCode",
    ];
    rows = [] as any;
    error: boolean = false;
    loading: boolean = true;

    //subheader buttons
    subheaderButtons = [
        { name: "Create New UOM", classInp: "UOM", style: "green" },
        { name: "Create New PU", classInp: "PU", style: "blue" },
        { name: "Create New HU", classInp: "HU", style: "orange" },
    ];

    constructor(
        private UOMService: UomService,
        private router: Router,
        private mainCommunicationService: MainCommunicationService
    ) {}

    ngOnInit(): void {
        this.fetchUOMs();
    }

    //temporary default paginator props
    paginatorProps = {
        length: 100,
        pageSize: 10,
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
        this.UOMService.fetchUOMs(
            this.paginatorProps.pageIndex,
            this.paginatorProps.pageSize
        ).subscribe({
            next: (response) => {
                if (response.status == 200) {
                    let rows = response.body.content;
                    this.rows = rows.map((element: any) => {
                        element.weightKG = element.metric.weightValue;
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

    search() {
        this.UOMService.getUOMByIdOrNameOrLongName();
    }

    viewUOMDetails(id: string) {
        this.router.navigate(["uom-details", id]);
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
        console.log(event.target?.files[0].name);
    }
}
