import { MainCommunicationService } from "./../../services/main-communication.service";
import { title } from "process";
import { UomService } from "./../../services/uom.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";

interface rowType {
    [key: string]: any;
}

@Component({
    selector: "app-uom-list",
    templateUrl: "./uom-list.component.html",
    styleUrl: "./uom-list.component.css",
})
export class UomListComponent implements OnInit {
    @ViewChild("fileInput")
    fileInput: any;
    headers = [
        "UOM ID",
        "UOM Name",
        "Description",
        "UOM Long Name",
        "UOM Short Name",
        "Weight (KG)",
        "Bulk Code",
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
    rows = [] as rowType[];

    //table
    loading: boolean = false;
    // paginator details

    length = 200;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions = [10, 20, 30, 40, 50];
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

    pageEvent!: PageEvent;

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
        this.rows = this.UOMService.fetchUOMs();
    }

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
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
