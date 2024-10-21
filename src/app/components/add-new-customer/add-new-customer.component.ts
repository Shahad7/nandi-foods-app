import { Component, ViewChild } from "@angular/core";
import "@ui5/webcomponents-fiori/dist/illustrations/UploadToCloud.js";

@Component({
    selector: "app-add-new-customer",
    templateUrl: "./add-new-customer.component.html",
    styleUrl: "./add-new-customer.component.css",
})
export class AddNewCustomerComponent {
    @ViewChild("notesFileUpload")
    notesFileUpload: any;
    customerNo: string = "";
    legalName: string = "";
    tradeName: string = "";
    address1: string = "";
    address2: string = "";
    city: string = "";
    state: string = "";
    postalCode: string = "";
    country: string = "";
    email: string = "";
    phone: string = "";
    mobile: string = "";
    firstName: string = "";
    middleName: string = "";
    lastName: string = "";
    position: string = "";
    category: string = "";
    accountManager: string = "";
    salesRep: string = "";
    effectiveDate: string = "";
    creditTerms: string = "";
    lastUpdated: string = "";
    lastUpdatedBy: string = "";
    status: string = "ACTIVE";
    statuses = ["ACTIVE", "PENDING", "HOLD", "CLOSED"];

    //tabs
    tabs = ["Notes & Files", "Credit Terms", "Shipping Info"];
    selectedTab = this.tabs[0];

    //uploadedFiles
    notesFileName: string = "";
    constructor() {}

    selectTab(event: any) {
        this.selectedTab = this.tabs[event.tabIndex / 2];
    }

    triggerNotesFileUpload() {
        this.notesFileUpload.nativeElement.click();
    }

    onNotesFileSubmit(event: any) {
        this.notesFileName = event.target?.files[0].name;
    }
}
