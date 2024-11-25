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
    @ViewChild("creditsFileUpload")
    creditsFileUpload: any;
    @ViewChild("shippingLocationFormContainer")
    shippingLocationFormContainer: any;
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

    //bottom credit terms tab fields
    creditTerms2: string = "";
    creditLimit: string = "";
    creditStatus: string = "";
    totalUnpaidInvoices: string = "";
    availableCredit: string = "";
    //tabs
    tabs = ["Notes & Files", "Credit Terms", "Shipping Info"];
    selectedTab = this.tabs[0];

    //image upload
    imageFileName: string = "";

    //uploadedFiles
    notesFileName: string = "";
    creditsFileName: string = "";

    //shipping info table
    loading: boolean = false;
    shippingInfoHeaders = ["Country", "State", "City", "Address"];
    shippingInfoRows = [
        {
            country: "CANADA",
            state: "Alberta",
            city: "Edmonton",
            address: "862 Parsons Road",
        },
        {
            country: "CANADA",
            state: "Alberta",
            city: "Calgary",
            address: "123 Main Street",
        },
    ] as any;
    shippingInfoKeys = ["country", "state", "city", "address"];
    constructor() {}

    selectTab(event: any) {
        this.selectedTab = this.tabs[event.tabIndex / 2];
    }

    triggerCreditsFileUpload() {
        this.creditsFileUpload.nativeElement.click();
    }

    triggerNotesFileUpload() {
        this.notesFileUpload.nativeElement.click();
    }

    onCreditsFileSubmit(event: any) {
        this.creditsFileUpload = event.target?.files[0].name;
    }
    onNotesFileSubmit(event: any) {
        this.notesFileName = event.target?.files[0].name;
    }

    onAddNewShippingLocation() {
        this.shippingLocationFormContainer.nativeElement.style.display = "flex";
    }

    onCancelShippingLocationForm() {
        this.shippingLocationFormContainer.nativeElement.style.display = "none";
    }

    onSaveShippingLocationForm() {
        //to-do
        this.shippingLocationFormContainer.nativeElement.style.display = "none";
    }

    onImageChange(event: any) {
        console.log(event);
    }

    onSave() {}
}
