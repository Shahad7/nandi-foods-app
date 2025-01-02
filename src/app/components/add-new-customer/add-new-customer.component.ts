import { Component, ViewChild } from "@angular/core";
import "@ui5/webcomponents-fiori/dist/illustrations/UploadToCloud.js";
import { Customer } from "../../models/customer";
import { CreditInfo } from "../../models/creditInfo";
import { ShippingInfo } from "../../models/shippingInfo";
import { FormField, FormInputData } from "../../types/form-types";
import { TableHeader, TableKey, TableRow } from "../../types/table-types";

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

    //class refs

    //entities
    customer = new Customer();
    creditInfo = new CreditInfo();
    shippingInfo = new ShippingInfo();

    //formDatas
    mainformData: FormInputData = [
        {
            headerText: undefined,
            columnSpan: 1, // Two columns based on design layout
            content: [
                {
                    key: "customerNo",
                    type: "string",
                    label: "Customer No.",
                    required: true,
                    editable: true,
                    placeholder: "C0075",
                },
                {
                    key: "customerLegalName",
                    type: "string",
                    label: "Customer Legal Name",
                    required: true,
                    editable: true,
                    placeholder: "Heritage Bakery Ltd.",
                },
                {
                    key: "customerTradeName",
                    type: "string",
                    label: "Customer Trade Name",
                    required: false,
                    editable: true,
                    placeholder: "Heritage Bakery",
                },
            ],
        },
        {
            headerText: "Billing Address", // Form Group Header
            columnSpan: 2, // Single column for address fields
            content: [
                {
                    key: "address1",
                    type: "string",
                    label: "Address 1",
                    required: true,
                    editable: true,
                    placeholder: "862 Parsons Road",
                },
                {
                    key: "address2",
                    type: "string",
                    label: "Address 2",
                    required: false,
                    editable: true,
                    placeholder: "",
                },
                {
                    key: "city",
                    type: "string",
                    label: "City",
                    required: true,
                    editable: true,
                    placeholder: "Edmonton",
                },
                {
                    key: "stateProvince",
                    type: "string",
                    label: "State/Province",
                    required: true,
                    editable: true,
                    placeholder: "Alberta",
                },
                {
                    key: "zipPostalCode",
                    type: "string",
                    label: "Zip/Postal Code",
                    required: true,
                    editable: true,
                    placeholder: "T6X 0B4",
                },
                {
                    key: "country",
                    type: "dropdown",
                    label: "Country",
                    required: true,
                    editable: true,
                    values: ["CANADA"],
                },
                {
                    key: "email",
                    type: "string",
                    label: "Email",
                    required: true,
                    editable: true,
                    placeholder: "",
                },
                {
                    key: "phone",
                    type: "string",
                    label: "Phone",
                    required: true,
                    editable: true,
                    placeholder: "+1 780 000 0000",
                },
                {
                    key: "mobile",
                    type: "string",
                    label: "Mobile",
                    required: false,
                    editable: true,
                    placeholder: "+1 587 000 0000",
                },
            ],
        },

        {
            headerText: "Billing Contact", // Form Group Header
            columnSpan: 2, // Two columns for person-related fields
            content: [
                {
                    key: "firstName",
                    type: "string",
                    label: "First Name",
                    required: true,
                    editable: true,
                    placeholder: "Mary",
                },
                {
                    key: "middleName",
                    type: "string",
                    label: "Middle Name",
                    required: false,
                    editable: true,
                    placeholder: "HACCP Certified Facility",
                },
                {
                    key: "lastName",
                    type: "string",
                    label: "Last Name",
                    required: true,
                    editable: true,
                    placeholder: "Collins",
                },
                {
                    key: "position",
                    type: "string",
                    label: "Position",
                    required: true,
                    editable: true,
                    placeholder: "Finance Manager",
                },
            ],
        },
        {
            headerText: undefined, // Form Group Header
            columnSpan: 1, // Single column for business-specific fields
            content: [
                {
                    key: "customerCategory",
                    type: "dropdown",
                    label: "Customer Category",
                    required: true,
                    editable: true,
                    values: ["Food Manufacturing - Bakeries"],
                },
                {
                    key: "accountManager",
                    type: "string",
                    label: "Account Manager",
                    required: true,
                    editable: true,
                    placeholder: "Thabani Mlambo",
                },
                {
                    key: "salesRep",
                    type: "string",
                    label: "Sales Rep",
                    required: true,
                    editable: true,
                    placeholder: "Nothando Lambati",
                },
            ],
        },
    ];
    creditsFormData = [
        {
            headerText: undefined,
            columnSpan: undefined, // Single column for this section
            content: [
                {
                    key: "creditTerms",
                    type: "string",
                    label: "Credit Terms",
                    required: true,
                    editable: true,
                },
                {
                    key: "creditLimit",
                    type: "string",
                    label: "Credit Limit",
                    required: true,
                    editable: true,
                },
                {
                    key: "creditStatus",
                    type: "string",
                    label: "Credit Status",
                    required: true,
                    editable: true,
                },
            ] as FormField[],
        },
        {
            headerText: undefined,
            columnSpan: undefined, // Single column for this section
            content: [
                {
                    key: "totalUnpaidInvoices",
                    type: "string",
                    label: "Total Unpaid Invoices",
                    required: false,
                    editable: true,
                },
                {
                    key: "availableCredit",
                    type: "string",
                    label: "Available Credit",
                    required: false,
                    editable: true,
                },
            ] as FormField[],
        },
    ];
    shippingFormData = [
        {
            headerText: "Shipping Address", // Form Group Header
            columnSpan: 2, // Two columns based on the design
            content: [
                {
                    key: "address1",
                    type: "string",
                    label: "Address 1",
                    required: true,
                    editable: true,
                },
                {
                    key: "address2",
                    type: "string",
                    label: "Address 2",
                    required: false,
                    editable: true,
                },
                {
                    key: "city",
                    type: "string",
                    label: "City",
                    required: true,
                    editable: true,
                },
                {
                    key: "state",
                    type: "string",
                    label: "State/Province",
                    required: true,
                    editable: true,
                },
                {
                    key: "postalCode",
                    type: "string",
                    label: "Zip/Postal Code",
                    required: true,
                    editable: true,
                },
                {
                    key: "country",
                    type: "string",
                    label: "Country",
                    required: true,
                    editable: true,
                },
                {
                    key: "email",
                    type: "string",
                    label: "Email",
                    required: true,
                    editable: true,
                },
                {
                    key: "phone",
                    type: "string",
                    label: "Phone",
                    required: true,
                    editable: true,
                },
                {
                    key: "mobile",
                    type: "string",
                    label: "Mobile",
                    required: false,
                    editable: true,
                },
            ] as FormField[],
        },
        {
            headerText: "Billing Contact", // Form Group Header
            columnSpan: 2, // Two columns based on the design
            content: [
                {
                    key: "firstName",
                    type: "string",
                    label: "First Name",
                    required: true,
                    editable: true,
                },
                {
                    key: "middleName",
                    type: "string",
                    label: "Middle Name",
                    required: false,
                    editable: true,
                },
                {
                    key: "lastName",
                    type: "string",
                    label: "Last Name",
                    required: true,
                    editable: true,
                },
                {
                    key: "position",
                    type: "string",
                    label: "Position",
                    required: true,
                    editable: true,
                },
            ] as FormField[],
        },
    ];

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
    shippingInfoHeaders: TableHeader[] = [
        { name: "Country" },
        { name: "State" },
        { name: "City" },
        { name: "Address" },
    ];
    shippingInfoRows: TableRow[] = [
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
    ];
    shippingInfoKeys: TableKey[] = [
        { name: "country" },
        { name: "state" },
        { name: "city" },
        { name: "address" },
    ];

    constructor() {}

    selectTab(event: any) {
        this.selectedTab = event;
    }

    onCreditsFileSubmit(event: any) {
        this.creditsFileName = event[0].name;
        console.log(event);
    }
    onNotesFileSubmit(event: any) {
        this.notesFileName = event[0].name;
        console.log(event);
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
