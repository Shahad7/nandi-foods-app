import { UomService } from "./../../services/uom.service";
import { MainCommunicationService } from "./../../services/main-communication.service";
import {
    BootstrapOptions,
    Component,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { UOMImperialRow } from "../../models/uom/table_rows/UomImperialRow";
import { UOMMetricRow } from "../../models/uom/table_rows/UomMetricRow";
import { LinkedUOMRow } from "../../models/uom/table_rows/linkedUomRow";
import { LinkedHuAndPuRow } from "../../models/uom/table_rows/linkedHuAndPuRow";
import { EventEmitter } from "stream";
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UOM } from "../../models/uom/uom";

interface RowType {
    [key: string]: any; // Allow dynamic access to row properties
}
@Component({
    selector: "app-uom-details",
    templateUrl: "./uom-details.component.html",
    styleUrl: "./uom-details.component.css",
})
export class UomDetailsComponent implements OnDestroy, OnInit {
    //enable/disable edit
    editingEnabled: boolean = false;
    currentDate: any;
    title: string = "UOM Details";

    uom: any = new UOM();
    //field to recognize the current selected unit
    classInp: any = "UOM";
    flexHU: boolean = true;

    //read-only
    lastUpdatedBy: string = "";
    dateCreated: string = "";
    effectiveDate: string = "";
    lastUpdated: string = "";
    status: string = "";

    //tabs
    tabs = ["UOM Weight and Volume", "Linked UOM", "Linked PU and HU"];
    selectedTab: any = "UOM Weight and Volume";
    nestedTabs = ["Metric", "Imperial"];
    selectedNestedTab: any = "Metric";
    selectedTable: any;

    //tables
    UOMImperialHeaders = [
        "Length <br/> (IN.)",
        "Width <br/> (IN.)",
        "Height <br/>(IN.)",
        "Volume <br/>(FT <sup>3</sup>)",
        "Weight <br/>(LB)",
    ];
    UOMMetricHeaders = [
        "Length <br/> (CM.)",
        "Width <br/> (CM.)",
        "Height <br/> (CM.)",
        "Volume <br/> (M<sup>3</sup>)",
        "Weight <br/> (KG)",
    ];
    UOMTableKeys = [
        "lengthValue",
        "widthValue",
        "heightValue",
        "volumeValue",
        "weightValue",
    ];

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
                "U4020",
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
                "U7020",
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
    statuses = ["ACTIVE", "PENDING", "HOLD", "CLOSED"];

    constructor(
        private datePipe: DatePipe,
        private mainCommunicationService: MainCommunicationService,
        private UOMService: UomService,
        private route: ActivatedRoute
    ) {
        this.currentDate = this.datePipe.transform(new Date(), "y/M/d");
    }
    ngOnInit(): void {
        let UOMId = this.route.snapshot.paramMap.get("UOMId");
        let UOM!: any;
        if (UOMId != "" && UOMId != undefined) {
            UOM = this.UOMService.getUOMById(UOMId as any)[0];
            this.uom.id = UOM["id"];
            this.uom.description = UOM["description"];
            this.uom.longName = UOM["longName"];
            this.uom.shortName = UOM["shortName"];
        }
        this.onUOMPropertiesChange();
    }

    ngOnDestroy(): void {}

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
        if (this.selectedTable == "LinkedUOM")
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
        console.log(this.uom);
        console.log(this.uom.imperial);
        console.log(this.uom.metric);
        console.log(this.LinkedPUAndHU);
        console.log(this.uom.linkedUOMs);
        console.log(this.LinkedUOM);
    }

    onBooleanChange(value: string, row: any, key: any): void {
        // Convert the string 'true'/'false' back to boolean
        row[key] = value === "true";
    }

    //let appropriate child component know when edit is clicked
    onEdit() {
        this.editingEnabled = !this.editingEnabled;
    }

    onUOMPropertiesChange() {
        this.uom.longName = `${this.uom.id} ${this.uom.name} (${this.uom.description})`;
        this.uom.shortName = ` ${this.uom.name} (${this.uom.id})`;
    }
}
