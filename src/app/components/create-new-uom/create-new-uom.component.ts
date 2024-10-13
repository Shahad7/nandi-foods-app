import { BootstrapOptions, Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { MetricImperialRow } from "../../models/metricImperialRow";
import { LinkedUOMRow } from "../../models/linkedUOMRow";
import { HUandPURow } from "../../models/huAndPuRow";

interface RowType {
    [key: string]: any; // Allow dynamic access to row properties
}

@Component({
    selector: "app-create-new-uom",
    templateUrl: "./create-new-uom.component.html",
    styleUrl: "./create-new-uom.component.css",
})
export class CreateNewUomComponent {
    currentDate: any;

    //editable-form-fields
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

    //read-only
    lastUpdatedBy: string = "John Doe";
    dateCreated: string = "2024-06-27";
    effectiveDate: string = "2024-06-27";
    lastUpdated: string = "2024-06-27";
    status: string = "ACTIVE";

    //tabs
    tabs = [
        "UOM Weight and Volume Metric Imperial",
        "Linked UOM",
        "Linked PU and HU",
    ];
    selectedTab: any = "UOM Weight and Volume Metric Imperial";

    //tables lookUp
    tablesMap = {
        "UOM Weight and Volume Metric Imperial": "MetricImperial",
        "Linked UOM": "LinkedUOM",
        "Linked PU and HU": "PUandHU",
    };
    selectedTable: any = "MetricImperial";

    //tables
    MetricImperial = {
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
        rows: [new MetricImperialRow(15.0, 8.3, 2.36, 2.04, 1.82)] as RowType[],
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
            { name: "linkedUOMName", type: "string" },
            { name: "lengthCm", type: "number" },
            { name: "widthCm", type: "number" },
            { name: "heightCm", type: "number" },
            { name: "volumeM3", type: "number" },
            { name: "weightKg", type: "number" },
            { name: "conversionFrom", type: "string" },
            { name: "conversionTo", type: "string" },
            { name: "conversionQTY", type: "number" },
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
    PUandHU = {
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
            { name: "puOrHuName", type: "string" },
            { name: "className", type: "string" },
            { name: "flexHU", type: "boolean" },
            { name: "lengthCm", type: "number" },
            { name: "widthCm", type: "number" },
            { name: "heightCm", type: "number" },
            { name: "volumeM3", type: "number" },
            { name: "maxWeightKG", type: "number" },
            { name: "conversionFrom", type: "string" },
            { name: "minQTY", type: "number" },
            { name: "maxQTY", type: "number" },
        ],

        rows: [
            new HUandPURow(
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
            new HUandPURow(
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

    constructor(private datePipe: DatePipe) {
        this.currentDate = this.datePipe.transform(new Date(), "y/M/d");
    }

    selectTab(event: any) {
        this.selectedTab = this.tabs[event.tabIndex / 2];
        this.selectedTable =
            this.tablesMap[this.selectedTab as keyof typeof this.tablesMap];
    }

    addNewRow() {
        if (this.selectedTable == "MetricImperial")
            this.MetricImperial.rows.push(new MetricImperialRow());
        else if (this.selectedTable == "LinkedUOM")
            this.LinkedUOM.rows.push(new LinkedUOMRow());
        else if (this.selectedTable == "PUandHU")
            this.PUandHU.rows.push(new HUandPURow());
    }

    deleteRow(index: number) {
        this[this.selectedTable as keyof CreateNewUomComponent].rows.splice(
            index,
            1
        );
    }

    onSave() {
        console.log(this.MetricImperial);
        console.log(this.PUandHU);
        console.log(this.LinkedUOM);
    }

    onBooleanChange(value: string, row: any, key: any): void {
        // Convert the string 'true'/'false' back to boolean
        row[key] = value === "true";
    }
}
