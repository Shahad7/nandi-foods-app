import { Component } from "@angular/core";
import { Warehouse } from "../../models/warehouse/warehouse";

@Component({
    selector: "app-create-new-warehouse",
    templateUrl: "./create-new-warehouse.component.html",
    styleUrl: "./create-new-warehouse.component.css",
})
export class CreateNewWarehouseComponent {
    //form model
    warehouse = new Warehouse();
    formData = [
        {
            headerText: undefined,
            columnSpan: 2,
            content: [
                {
                    key: "warehouseNo",
                    type: "string",
                    label: "Warehouse No.",
                    required: true,
                    editable: true,
                    placeholder: "WH01",
                },
                {
                    key: "warehouseName",
                    type: "string",
                    label: "Warehouse Name",
                    required: true,
                    editable: true,
                    placeholder: "Edmonton Warehouse",
                },
                {
                    key: "address1",
                    type: "string",
                    label: "Address 1",
                    required: true,
                    editable: true,
                    placeholder: "7931 Coronet Road",
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
                    key: "state",
                    type: "string",
                    label: "State/Province",
                    required: true,
                    editable: true,
                    placeholder: "Alberta",
                },
                {
                    key: "postalCode",
                    type: "string",
                    label: "Zip/Postal Code",
                    required: true,
                    editable: true,
                    placeholder: "T6E 4N7",
                },
                {
                    key: "country",
                    type: "dropdown",
                    label: "Country",
                    required: true,
                    editable: true,
                    values: ["CANADA", "USA"],
                },
            ],
        },
        {
            headerText: undefined,
            columnSpan: 2,
            content: [
                {
                    key: "email",
                    type: "string",
                    label: "Email",
                    required: true,
                    editable: true,
                    placeholder: "info@nandifoods.com",
                },
                {
                    key: "phone",
                    type: "string",
                    label: "Phone",
                    required: true,
                    editable: true,
                    placeholder: "+1 780 328 0957",
                },
                {
                    key: "mobile",
                    type: "string",
                    label: "Mobile",
                    required: false,
                    editable: true,
                    placeholder: "+1 587 778 6608",
                },
                {
                    key: "warehouseContact",
                    type: "string",
                    label: "Warehouse Contact",
                    required: true,
                    editable: true,
                    placeholder: "Dingi Mahlangu",
                },
            ],
        },
        {
            headerText: undefined,
            columnSpan: 2,
            content: [
                {
                    key: "facilityCert1",
                    type: "string",
                    label: "Facility Certification 1",
                    required: true,
                    editable: true,
                    placeholder: "HACCP Certified Facility",
                },
                {
                    key: "facilityCert2",
                    type: "string",
                    label: "Facility Certification 2",
                    required: false,
                    editable: true,
                    placeholder: "",
                },
                {
                    key: "facilityCert3",
                    type: "string",
                    label: "Facility Certification 3",
                    required: false,
                    editable: true,
                    placeholder: "",
                },
            ],
        },
        {
            headerText: undefined,
            columnSpan: 2,
            content: [
                {
                    key: "capacityLB",
                    type: "number",
                    label: "Warehouse Capacity (LB)",
                    required: true,
                    editable: true,
                    placeholder: "68100.00",
                },
                {
                    key: "capacityKG",
                    type: "number",
                    label: "Warehouse Capacity (KG)",
                    required: true,
                    editable: true,
                    placeholder: "30000.00",
                },
            ],
        },
    ];

    //tabs
    tabs = [
        "Warehouse Notes",
        "Bin Locations",
        "Storage Capacity",
        "Warehouse Items",
        "Warehouse Safety",
        "Compliance",
        "People",
    ];
    selectedTab = this.tabs[0];

    constructor() {}

    selectTab(event: any) {
        this.selectedTab = event;
    }

    onImageChange(event: any) {
        console.log(event);
    }
}
