import { UomService } from "./../../services/uom.service";
import { MainCommunicationService } from "./../../services/main-communication.service";
import { BootstrapOptions, Component, OnInit, Output } from "@angular/core";
import { DatePipe } from "@angular/common";
import { UOMImperialRow } from "../../models/uom/table_rows/UomImperialRow";
import { UOMMetricRow } from "../../models/uom/table_rows/UomMetricRow";
import { LinkedUOMRow } from "../../models/uom/table_rows/linkedUomRow";
import { LinkedHuAndPuRow } from "../../models/uom/table_rows/linkedHuAndPuRow";
import { EventEmitter } from "stream";
import { UOM } from "../../models/uom/uom";
import { ActivatedRoute } from "@angular/router";
import { error } from "console";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";

interface RowType {
    [key: string]: any; // Allow dynamic access to row properties
}

@Component({
    selector: "app-create-new-uom",
    templateUrl: "./create-new-uom.component.html",
    styleUrl: "./create-new-uom.component.css",
})
export class CreateNewUomComponent implements OnInit {
    currentDate: any;
    title: string = "Create New UOM";
    uom: any = new UOM(
        "Level 1",
        "EACH",
        "1 x 4LB",
        undefined,
        undefined,
        undefined,
        true,
        true,
        true,
        true,
        undefined,
        "U1020"
    );
    //field to recognize the current selected unit
    classInp: any = "UOM";
    flexHU: boolean = true;
    excluded: Array<string> = [];
    formData = [
        [
            {
                key: "name",
                type: "dropdown",
                label: "UOM Type",
                required: true,
                editable: true,
                values: ["EACH", "other1", "other2"],
            },
            {
                key: "description",
                type: "string",
                label: "UOM Description",
                required: true,
                editable: true,
            },
            {
                key: "longName",
                type: "string",
                label: "UOM Long Name",
                required: true,
                editable: true,
            },
            {
                key: "isInventory",
                type: "boolean",
                label: "Inventory UOM",
                required: true,
                editable: true,
            },
            {
                key: "isPurchase",
                type: "boolean",
                label: "Purchase UOM",
                required: true,
                editable: true,
            },
        ],
        [
            {
                key: "level",
                type: "dropdown",
                label: "UOM Level",
                required: true,
                editable: true,
                values: ["Level 1", "Level 2"],
            },
            {
                key: "id",
                type: "string",
                label: "UOM ID",
                required: true,
                editable: true,
            },
            {
                key: "shortName",
                type: "string",
                label: "UOM Short Name",
                required: true,
                editable: true,
            },
            {
                key: "isProduction",
                type: "boolean",
                label: "Production UOM",
                required: true,
                editable: true,
            },
            {
                key: "isSales",
                type: "boolean",
                label: "Sales UOM",
                required: true,
                editable: true,
            },
            {
                key: "flexHU",
                type: "boolean",
                label: "flex HU",
                required: true,
                editable: true,
            },
        ],
    ];

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

    constructor(
        private datePipe: DatePipe,
        private mainCommunicationService: MainCommunicationService,
        private route: ActivatedRoute,
        private UomService: UomService,
        private snackBar: MatSnackBar
    ) {
        this.currentDate = this.datePipe.transform(new Date(), "y/M/d");
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.classInp =
                params["class"] == undefined ? "UOM" : params["class"];

            this.onClassChange();
        });

        this.onUOMPropertiesChange();
    }

    onModelChange(event: any) {
        //actual binding
        this.uom[event.key] = event.value;

        //other changes
        if (["description", "id", "name"].includes(event.key)) {
            this.onUOMPropertiesChange();
        }

        //boolean conversion
        if (
            ["isSales", "isInventory", "isPurchase", "isProduction"].includes(
                event.key
            )
        ) {
            this.uom[event.key] = event.value === "true";
        }
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
        if (this.selectedTable == "LinkedUOM")
            this.LinkedUOM.rows.push(new LinkedUOMRow());
        else if (this.selectedTable == "LinkedPUAndHU")
            this.LinkedPUAndHU.rows.push(new LinkedHuAndPuRow());
    }

    deleteRow(index: number) {
        this[this.selectedTable as keyof CreateNewUomComponent].rows.splice(
            index,
            1
        );
    }

    onSave() {
        console.log(this.uom);
        this.UomService.save(this.uom).subscribe({
            next: (response) => {
                if (response.status == 201) {
                    this.onSuccessfulSubmit();
                }
            },
            error: (errorResponse: HttpErrorResponse) => {
                // console.log(errorResponse);
                this.onErrorResponse(errorResponse.error.message);
            },
        });
    }

    onSuccessfulSubmit() {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: { message: "UOM successfully saved!", error: false },
            duration: 1500,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["success-snackbar"],
        });
        this.uom = new UOM(
            "Level 1",
            "EACH",
            "1 x 4LB",
            undefined,
            undefined,
            undefined,
            true,
            true,
            true,
            true,
            undefined,
            "U1020"
        );
        this.onUOMPropertiesChange();
    }

    onErrorResponse(errorMessage: string) {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: { message: errorMessage, error: true },
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["error-snackbar"],
        });
    }

    //in case user changes the class, when currently last tab is opened which is to be excluded
    //for certain classes selected
    //also emit an event to change the title if needed
    onClassChange() {
        if (this.classInp == "HU") {
            this.excluded = [
                "isSales",
                "isInventory",
                "isPurchase",
                "isProduction",
            ];
        } else if (this.classInp == "UOM") {
            this.excluded = ["flexHU"];
        } else if (this.classInp == "PU") {
            this.excluded = [
                "isSales",
                "isInventory",
                "isPurchase",
                "isProduction",
                "flexHU",
            ];
        }
        //tabs n title changes
        if (this.selectedTab == this.tabs[2]) {
            this.selectedTab = this.tabs[0];
        }
        if (this.classInp == "HU") this.title = "Create New HU";
        else if (this.classInp == "PU") this.title = "Create New PU";
        else this.title = "Create New UOM";
    }

    onUOMPropertiesChange() {
        this.uom.longName = `${this.uom.id} ${this.uom.name} (${this.uom.description})`;
        this.uom.shortName = ` ${this.uom.name} (${this.uom.id})`;
    }
}
