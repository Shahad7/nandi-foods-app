import { MainCommunicationService } from "./../../services/main-communication.service";
import { BootstrapOptions, Component, Output } from "@angular/core";
import { DatePipe } from "@angular/common";
import { UOMImperialRow } from "../../models/UOMImperialRow";
import { UOMMetricRow } from "../../models/UOMMetricRow";
import { LinkedUOMRow } from "../../models/linkedUOMRow";
import { LinkedHuAndPuRow } from "../../models/linkedHuAndPuRow";
import { EventEmitter } from "stream";

interface RowType {
    [key: string]: any; // Allow dynamic access to row properties
}
@Component({
    selector: "app-uom-details",
    templateUrl: "./uom-details.component.html",
    styleUrl: "./uom-details.component.css",
})
export class UomDetailsComponent {
    //enable/disable edit
    enableEditing: boolean = false;
    currentDate: any;

    //editable-form-fields
    //this field alters form fields
    classInp: any = "UOM";
    UOMType: any = "EACH";
    UOMDescription: string = "1 x 4LB";
    UOMLongName: string = "U1020 EACH (1 x 4LB)";
    isInventoryUOM: boolean = true;
    isPurchaseUOM: boolean = false;
    UOMLevel: string = "Level 1";
    UOMID: string = "U1020";
    UOMShortName: string = "EACH (U1020)";
    isProductionUOM: boolean = true;
    isSalesUOM: boolean = true;
    flexHU: boolean = true;

    //read-only
    lastUpdatedBy: string = "John Doe";
    dateCreated: string = "2024-06-27";
    effectiveDate: string = "2024-06-27";
    lastUpdated: string = "2024-06-27";
    status: string = "ACTIVE";

    //tabs
    tabs = ["UOM Weight and Volume", "Linked UOM", "Linked PU and HU"];
    selectedTab: any = "UOM Weight and Volume";
    nestedTabs = ["Metric", "Imperial"];
    selectedNestedTab: any = "Metric";
    selectedTable: any;

    //tables
    UOMImperial = {
        headers: [
            "Length <br/> (IN.)",
            "Width <br/> (IN.)",
            "Height <br/>(IN.)",
            "Volume <br/>(FT <sup>3</sup>)",
            "Weight <br/>(LB)",
        ],
        keys: [
            { name: "lengthIn", type: "number" },
            { name: "widthIn", type: "number" },
            { name: "heightIn", type: "number" },
            { name: "volumeFt3", type: "number" },
            { name: "weightLb", type: "number" },
        ],
        rows: [new UOMImperialRow(15.0, 8.3, 2.36, 2.04, 1.82)] as RowType[],
    };
    UOMMetric = {
        headers: [
            "Length <br/> (CM.)",
            "Width <br/> (CM.)",
            "Height <br/> (CM.)",
            "Volume <br/> (M<sup>3</sup>)",
            "Weight <br/> (KG)",
        ],
        keys: [
            { name: "lengthCm", type: "number" },
            { name: "widthCm", type: "number" },
            { name: "heightCm", type: "number" },
            { name: "volumeM3", type: "number" },
            { name: "weightKg", type: "number" },
        ],
        rows: [new UOMMetricRow(38.1, 21.08, 5.99, 0.0578, 0.826)] as RowType[],
    };

    LinkedUOM = {
        headers: [
            "Linked UOM Name",
            "Length <br/> (CM)",
            "Width <br/> (CM)",
            "Height <br/>(CM)",
            "Volume <br/>(M<sup>3</sup>)",
            "Weight <br/>(KG)",
            "Conversion From",
            "Conversion To",
            "Conversion QTY",
        ],
        keys: [
            { name: "linkedUOMName", type: "dropdown", editable: true },
            { name: "lengthCm", type: "number", editable: false },
            { name: "widthCm", type: "number", editable: false },
            { name: "heightCm", type: "number", editable: false },
            { name: "volumeM3", type: "number", editable: false },
            { name: "weightKg", type: "number", editable: false },
            { name: "conversionFrom", type: "string", editable: false },
            { name: "conversionTo", type: "string", editable: false },
            { name: "conversionQTY", type: "number", editable: true },
        ],
        rows: [
            new LinkedUOMRow(
                "U4020 CASE (10 x 4LB)",
                60,
                30,
                30,
                0.05,
                18.2,
                "U1020 EACH (1 x 4LB)",
                "U4020 EACH (10 x 4LB)",
                10.0
            ),
            new LinkedUOMRow(
                "U7020 PALLET (500 x 4LB)",
                122,
                107,
                166,
                2.17,
                910.0,
                "U1020 EACH (1 x 4LB)",
                "U7020 PALLET (500 x 4LB)",
                500.0
            ),
        ] as RowType[],
    };
    LinkedPUAndHU = {
        headers: [
            "PU/HU Name",
            "Class",
            "Flex HU",
            "Length <br/> (CM)",
            "Width <br/> (CM)",
            "Height <br/>(CM)",
            "Volume <br/>(M<sup>3</sup>)",
            "Max Weight <br/>&nbsp;&nbsp;&nbsp; (KG)",
            "Conversion From",
            "Min QTY",
            "Max QTY",
        ],
        keys: [
            { name: "puOrHuName", type: "dropdown", editable: true },
            { name: "className", type: "string", editable: false },
            { name: "flexHU", type: "boolean", editable: false },
            { name: "lengthCm", type: "number", editable: false },
            { name: "widthCm", type: "number", editable: false },
            { name: "heightCm", type: "number", editable: false },
            { name: "volumeM3", type: "number", editable: false },
            { name: "maxWeightKG", type: "number", editable: false },
            { name: "conversionFrom", type: "string", editable: false },
            { name: "minQTY", type: "number", editable: true },
            { name: "maxQTY", type: "number", editable: true },
        ],

        rows: [
            new LinkedHuAndPuRow(
                "U4020 CASE (10 x 4LB)",
                "PU",
                false,
                60,
                30,
                30,
                0.05,
                18.7,
                "U1020 EACH (1 x 4LB)",
                1.0,
                10.0
            ),
            new LinkedHuAndPuRow(
                "U7502 PALLET (10 x 4LB)",
                "HU",
                true,
                122,
                107,
                166,
                2.17,
                930.0,
                "U1020 EACH (1 x 4LB)",
                20.0,
                500.0
            ),
        ] as RowType[],
    };

    //DROPDOWNS

    linkedUOMNames = ["U4020 CASE (10 x 4LB)", "U7020 PALLET (500 x 4LB)"];
    linkedHuAndPuNames = ["U4020 CASE (10 x 4LB)", "U7502 PALLET (10 x 4LB)"];

    constructor(
        private datePipe: DatePipe,
        private mainCommunicationService: MainCommunicationService
    ) {
        this.currentDate = this.datePipe.transform(new Date(), "y/M/d");
    }

    selectTab(event: any) {
        this.selectedTab = this.tabs[event.tabIndex / 2];

        if (
            this.selectedTab == "UOM Weight and Volume" &&
            this.selectedNestedTab == "Metric"
        ) {
        } else if (
            this.selectedTab == "UOM Weight and Volume" &&
            this.selectedNestedTab == "Imperial"
        ) {
            this.selectedTable == "UOMImperial";
        } else if (this.selectedTab == "Linked UOM")
            this.selectedTable = "LinkedUOM";
        else if (this.selectedTab == "Linked PU and HU")
            this.selectedTable = "LinkedPUAndHU";
    }

    selectNestedTab(event: any) {
        this.selectedNestedTab = this.nestedTabs[event.tabIndex / 2];
    }

    addNewRow() {
        if (this.selectedTable == "UOMImperial")
            this.UOMImperial.rows.push(new UOMImperialRow());
        else if (this.selectedTable == "UOMMetric")
            this.UOMMetric.rows.push(new UOMMetricRow());
        else if (this.selectedTable == "LinkedUOM")
            this.LinkedUOM.rows.push(new LinkedUOMRow());
        else if (this.selectedTable == "LinkedPUAndHU")
            this.LinkedPUAndHU.rows.push(new LinkedHuAndPuRow());
    }

    deleteRow(index: number) {
        this[this.selectedTable as keyof UomDetailsComponent].rows.splice(
            index,
            1
        );
    }

    onSave() {
        console.log(this.UOMImperial);
        console.log(this.UOMMetric);
        console.log(this.LinkedPUAndHU);
        console.log(this.LinkedUOM);
    }

    onBooleanChange(value: string, row: any, key: any): void {
        // Convert the string 'true'/'false' back to boolean
        row[key] = value === "true";
    }

    //in case user changes the class, when currently last tab is opened which is to be excluded
    //for certain classes selected
    //also emit an event to change the title if needed
    onClassChange() {
        if (this.selectedTab == this.tabs[2]) {
            this.selectedTab = this.tabs[0];
        }
        if (this.classInp == "HU")
            this.mainCommunicationService.alertTitleChange("HU Details");
        else if (this.classInp == "PU")
            this.mainCommunicationService.alertTitleChange("PU Details");
    }

    onEdit() {
        this.enableEditing = true;
    }
}
