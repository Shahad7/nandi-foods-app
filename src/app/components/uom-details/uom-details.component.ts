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
import { ActivatedRoute, Router } from "@angular/router";
import { UOM } from "../../models/uom/uom";
import { CreateNewUomComponent } from "../create-new-uom/create-new-uom.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PageEvent } from "@angular/material/paginator";
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";

interface RowType {
    [key: string]: any; // Allow dynamic access to row properties
}
@Component({
    selector: "app-uom-details",
    templateUrl: "./uom-details.component.html",
    styleUrl: "./uom-details.component.css",
})
export class UomDetailsComponent implements OnInit {
    //model
    uom: any = new UOM();

    error: boolean = false;

    //enable/disable edit
    editingEnabled: boolean = false;
    title: string = "UOM Details";

    //field to recognize the current selected unit
    classInp: any = "UOM";

    //metadata
    classLevels: Array<string> = [];
    classLevelTypes: Array<string> = [];
    statuses: Array<string> = [];
    flexHU: boolean = true;

    //read-only
    lastUpdatedBy: string = "";

    //form variables
    excluded: Array<string> = [];
    formData = [
        {
            headerText: undefined, // First group doesn't have a header
            columnSpan: undefined, // No specific column span defined
            content: [
                {
                    key: "name",
                    type: "dropdown",
                    label: "UOM Type",
                    required: true,
                    editable: true,
                    values: this.classLevelTypes,
                },
                {
                    key: "description",
                    type: "string",
                    label: "UOM Description",
                    required: true,
                    editable: true,
                    placeholder: "1 x 4LB",
                },
                {
                    key: "longName",
                    type: "string",
                    label: "UOM Long Name",
                    required: true,
                    editable: true,
                    placeholder: "U1020 EACH (1 x 4LB)",
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
        },
        {
            headerText: undefined, // Second group doesn't have a header
            columnSpan: undefined, // No specific column span defined
            content: [
                {
                    key: "level",
                    type: "dropdown",
                    label: "UOM Level",
                    required: true,
                    editable: true,
                    values: this.classLevels,
                },
                {
                    key: "id",
                    type: "string",
                    label: "UOM ID",
                    required: true,
                    editable: true,
                    placeholder: "U1020",
                },
                {
                    key: "shortName",
                    type: "string",
                    label: "UOM Short Name",
                    required: true,
                    editable: true,
                    placeholder: "EACH (1020)",
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
        },
    ];

    //tabs
    tabs = ["UOM Weight and Volume", "Linked UOM", "Linked PU and HU"];
    tabsToExclude: Array<string> = [];
    selectedTab: any = "UOM Weight and Volume";
    nestedTabs = ["Metric", "Imperial"];
    selectedNestedTab: any = "Metric";
    selectedTable: any;

    //tables
    UOMImperialHeaders = [
        { name: "Length <br/> (IN.)", minWidth: "101px" },
        { name: "Width <br/> (IN.)", minWidth: "101px" },
        { name: "Height <br/>(IN.)", minWidth: "101px" },
        { name: "Volume <br/>(FT <sup>3</sup>)", minWidth: "101px" },
        { name: "Weight <br/>(LB)", minWidth: "101px" },
    ];

    UOMMetricHeaders = [
        { name: "Length <br/> (CM.)", minWidth: "101px" },
        { name: "Width <br/> (CM.)", minWidth: "101px" },
        { name: "Height <br/> (CM.)", minWidth: "101px" },
        { name: "Volume <br/> (M<sup>3</sup>)", minWidth: "101px" },
        { name: "Weight <br/> (KG)", minWidth: "101px" },
    ];

    UOMTableKeys = [
        { name: "lengthValue", type: "number", editable: true },
        { name: "widthValue", type: "number", editable: true },
        { name: "heightValue", type: "number", editable: true },
        { name: "volumeValue", type: "number", editable: true },
        { name: "weightValue", type: "number", editable: true },
    ];

    LinkedUOM = {
        headers: [
            { name: "Linked UOM Name", minWidth: "101px" },
            { name: "Length <br/> (CM)", minWidth: "101px" },
            { name: "Width <br/> (CM)", minWidth: "101px" },
            { name: "Height <br/>(CM)", minWidth: "101px" },
            { name: "Volume <br/>(M<sup>3</sup>)", minWidth: "101px" },
            { name: "Weight <br/>(KG)", minWidth: "101px" },
            { name: "Conversion From", minWidth: "101px" },
            { name: "Conversion To", minWidth: "101px" },
            { name: "Conversion QTY", minWidth: "101px" },
        ],
        keys: [
            {
                name: "linkedUOMName",
                type: "dropdown",
                editable: true,
                values: ["U4020 CASE (10 x 4LB)", "U7020 PALLET (500 x 4LB)"],
            },
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
            { name: "PU/HU Name", minWidth: "101px" },
            { name: "Class", minWidth: "101px" },
            { name: "Flex HU", minWidth: "101px" },
            { name: "Length <br/> (CM)", minWidth: "101px" },
            { name: "Width <br/> (CM)", minWidth: "101px" },
            { name: "Height <br/>(CM)", minWidth: "101px" },
            { name: "Volume <br/>(M<sup>3</sup>)", minWidth: "101px" },
            {
                name: "Max Weight <br/>&nbsp;&nbsp;&nbsp; (KG)",
                minWidth: "101px",
            },
            { name: "Conversion From", minWidth: "101px" },
            { name: "Min QTY", minWidth: "101px" },
            { name: "Max QTY", minWidth: "101px" },
        ],
        keys: [
            {
                name: "puOrHuName",
                type: "dropdown",
                editable: true,
                values: ["U4020 CASE (10 x 4LB)", "U7502 PALLET (10 x 4LB)"],
            },
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
                "U4020",
                "U4020 CASE (10 x 4LB)",
                "PU",
                false,
                60,
                30,
                30,
                0.05,
                18.7,
                "U4020 EACH (1 x 4LB)",
                1.0,
                10.0
            ),
            new LinkedHuAndPuRow(
                "U7502",
                "U7502 PALLET (10 x 4LB)",
                "HU",
                true,
                122,
                107,
                166,
                2.17,
                930.0,
                "U7502 EACH (1 x 4LB)",
                20.0,
                500.0
            ),
        ] as RowType[],
    };

    //temporary default paginator props

    paginatorProps = {
        length: 200,
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
    }

    constructor(
        protected mainCommunicationService: MainCommunicationService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected uomService: UomService,
        protected snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        //fetch the uom details by Id
        let UOMId = this.route.snapshot.paramMap.get("UOMId");
        if (UOMId != "" && UOMId != undefined) {
            this.uomService.getUOMById(UOMId as any).subscribe({
                next: (response) => {
                    if (response.status == 200) {
                        this.uom = response.body;
                    }
                },
                error: (response) => {
                    this.error = true;
                },
            });
        }
        //fetch required unit metadata
        this.uomService.getUnitClassStatuses().subscribe({
            next: (response) => {
                let body = response.body as Array<any>;
                body?.forEach((element: any) => {
                    this.statuses.push(element?.name);
                });
            },
            error: (response) => {
                this.error = true;
            },
        });

        this.uomService.getUnitClassLevels().subscribe({
            next: (response) => {
                let body = response.body as Array<any>;
                body?.forEach((element: any) => {
                    this.classLevels.push(element?.level);
                    this.classLevelTypes.push(element?.type);
                });
            },
            error: (response) => {
                this.error = true;
            },
        });
    }
    //Adding new rows, might need to be changed to pop up forms later
    onNewLinkedUOMRow() {
        this.LinkedUOM.rows.push(new LinkedUOMRow());
    }
    onNewLinkedPUHURow() {
        this.LinkedPUAndHU.rows.push(new LinkedHuAndPuRow());
    }

    /**  Manual bindigs */
    onFormModelChange(event: any) {
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
            this.uom[event.key] = event.value === "true" || event.value == true;
        }
    }

    selectTab(tab: any) {
        this.selectedTab = tab;

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

    selectNestedTab(tab: any) {
        this.selectedNestedTab = tab;
    }

    //TODO
    onSave() {}

    //TODO
    onCancel() {}

    //TODO
    onApprove() {}

    onDelete() {
        alert("here");
        this.uomService.deleteUOMById(this.uom.id).subscribe({
            next: (response) => {
                if (response.status == 204) {
                    this.snackBar.openFromComponent(SnackbarComponent, {
                        data: {
                            message: "UOM successfully deleted!",
                            error: false,
                        },
                        duration: 1500,
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        panelClass: ["success-snackbar"],
                    });
                    this.router.navigate(["uom-list"]);
                }
            },
            error: (response) => {},
        });
    }

    //let appropriate child component know when edit is clicked
    onEdit() {
        this.editingEnabled = !this.editingEnabled;
    }

    onSuccessfulSubmit() {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: { message: "UOM successfully saved!", error: false },
            duration: 1500,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["success-snackbar"],
        });
        this.uom = new UOM();
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

    onUOMPropertiesChange() {
        this.uom.longName = `${this.uom.id} ${this.uom.name} (${this.uom.description})`;
        this.uom.shortName = ` ${this.uom.name} (${this.uom.id})`;
    }
}
