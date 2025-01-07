import { UomService } from "./../../services/uom.service";
import { MainCommunicationService } from "./../../services/main-communication.service";
import {
    BootstrapOptions,
    Component,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { UOMImperialRow } from "../../models/uom/table_rows/UomImperialRow";
import { UOMMetricRow } from "../../models/uom/table_rows/UomMetricRow";
import { LinkedUOMRow } from "../../models/uom/table_rows/linkedUomRow";
import { LinkedHuAndPuRow } from "../../models/uom/table_rows/linkedHuAndPuRow";
import { UOM } from "../../models/uom/uom";
import { ActivatedRoute, Router } from "@angular/router";
import { error, log } from "console";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { LinkedUOM } from "../../models/uom/linkedUOM";
import { FormInputData } from "../../types/form-types";
import { TableHeader, TableKey } from "../../types/table-types";

interface RowType {
    [key: string]: any; // Allow dynamic access to row properties
}

@Component({
    selector: "app-create-new-uom",
    templateUrl: "./create-new-uom.component.html",
    styleUrl: "./create-new-uom.component.css",
})
export class CreateNewUomComponent implements OnInit, OnDestroy {
    //subscriptions
    routeSubscription!: Subscription;

    error: boolean = false;
    validationErrors: Array<string> = [];

    title: string = "Create New UOM";
    uom: any = new UOM();

    //field to recognize the current selected unit
    classInp: any = "UOM";
    //metadata
    classTypes: Array<string> = [];
    classLevels: Array<string> = [];
    classLevelTypes: Array<string> = [];
    classNamesLookup: Map<String, String> = new Map();
    metricUnits: Map<string, string> = new Map();
    imperialUnits: Map<string, string> = new Map();

    flexHU: boolean = true;
    linkedUOMs: Map<string, LinkedUOMRow> = new Map();
    linkedUOMNames: Array<string> = [];

    //form variables
    excluded: Array<string> = [];
    formData: FormInputData = [
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
                    editable: false,
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
                    maxlength: 15,
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
                    key: "effectiveDate",
                    type: "date",
                    label: "Effective Date",
                    required: true,
                    editable: true,
                    formatPattern: "YYYY-MM-dd",
                    placeholder: "2024-11-06",
                    minDate: new Date().toISOString().split("T")[0],
                    maxDate: new Date(
                        new Date().setDate(new Date().getDate() + 91)
                    )
                        .toISOString()
                        .split("T")[0],
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
    UOMImperialHeaders = [] as TableHeader[];
    UOMMetricHeaders = [] as TableHeader[];
    UOMTableKeys: TableKey[] = [
        { name: "lengthValue", type: "decimal", editable: true },
        { name: "widthValue", type: "decimal", editable: true },
        { name: "heightValue", type: "decimal", editable: true },
        { name: "volumeValue", type: "decimal", editable: false },
        { name: "weightValue", type: "decimal", editable: true },
    ];

    LinkedUOM = {
        //adds headers in the getMetricSystemUnits Subscription
        headers: [] as TableHeader[],
        keys: [
            {
                name: "linkedUOMName",
                type: "dropdown",
                editable: true,
                defaultEmpty: true,
                values: this.linkedUOMNames,
            },
            { name: "lengthValue", type: "number", editable: false },
            { name: "widthValue", type: "number", editable: false },
            { name: "heightValue", type: "number", editable: false },
            { name: "volumeValue", type: "number", editable: false },
            { name: "weightKg", type: "number", editable: false },
            { name: "conversionFrom", type: "string", editable: false },
            { name: "conversionTo", type: "string", editable: false },
            { name: "conversionQTY", type: "number", editable: true },
        ] as TableKey[],
    };
    LinkedPUAndHU = {
        //adds headers in the getMetricSystemUnits Subscription
        headers: [] as TableHeader[],
        keys: [
            {
                name: "puOrHuName",
                type: "dropdown",
                editable: true,
                values: ["U4020 CASE (10 x 4LB)", "U7502 PALLET (10 x 4LB)"],
            },
            { name: "className", type: "string", editable: false },
            { name: "flexHU", type: "boolean", editable: false },
            { name: "lengthValue", type: "number", editable: false },
            { name: "widthValue", type: "number", editable: false },
            { name: "heightValue", type: "number", editable: false },
            { name: "volumeValue", type: "number", editable: false },
            { name: "maxWeightKG", type: "number", editable: false },
            { name: "conversionFrom", type: "string", editable: false },
            { name: "minQTY", type: "number", editable: true },
            { name: "maxQTY", type: "number", editable: true },
        ] as TableKey[],
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
        protected uomService: UomService,
        protected snackBar: MatSnackBar,
        protected router: Router
    ) {}
    ngOnInit(): void {
        //fetch required unit metadata
        this.uomService.getUnitClassTypes().subscribe({
            next: (response) => {
                let body = response.body as Array<any>;
                body?.forEach((element: any) => {
                    this.classTypes.push(element?.class);
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
                    this.classNamesLookup.set(element?.level, element?.type);
                });
            },
            error: (response) => {
                this.error = true;
            },
        });

        this.routeSubscription = this.route.queryParams.subscribe((params) => {
            this.classInp =
                params["class"] == undefined ? "UOM" : params["class"];
            this.onClassChange();
        });

        // fetch UOM list for populating linkedUOM table
        // uom list will have utmost 1000 records - dec 20 - 2024
        this.uomService.fetchUOMs(0, 1000, true, "", "ACTIVE").subscribe({
            next: (response) => {
                let content = response.body.content;
                content.forEach((elt: any) => {
                    this.linkedUOMNames.push(elt.longName);
                    let linkedUOMRow = new LinkedUOMRow();
                    linkedUOMRow.id = elt.id;
                    linkedUOMRow.linkedUOMName = elt.longName;
                    linkedUOMRow.conversionFrom = this.uom.longName;
                    linkedUOMRow.conversionTo = elt.longName;
                    elt.measuredValues?.forEach((item: any) => {
                        if (item.measurementSystem == "SI") {
                            linkedUOMRow.lengthValue = item.lengthValue;
                            linkedUOMRow.heightValue = item.heightValue;
                            linkedUOMRow.widthValue = item.widthValue;
                            linkedUOMRow.weightKg = item.weightValue;
                        }
                    });
                    this.linkedUOMs.set(elt.longName, linkedUOMRow);
                });
            },
        });

        //fetch metric and imperial system units metadata
        this.uomService.getMetricSystemUnits().subscribe({
            next: (response) => {
                let metricUnits = new Map<string, string>();
                let imperialUnits = new Map<string, string>();
                (response.body as any).forEach((elt: any) => {
                    if (elt.name == "SI") {
                        Object.keys(elt).forEach((key) => {
                            metricUnits.set(key, elt[key]);
                        });
                        this.metricUnits = metricUnits;
                    } else if (elt.name == "IMPERIAL") {
                        Object.keys(elt).forEach((key) => {
                            imperialUnits.set(key, elt[key]);
                        });
                        this.imperialUnits = imperialUnits;
                    }
                    //initialize all unit dependent table headers
                    this.LinkedUOM.headers = [
                        { name: "Linked UOM Name", minWidth: "101px" },
                        {
                            name:
                                "Length <br/>(" +
                                this.metricUnits.get("lengthUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Width <br/>(" +
                                this.metricUnits.get("widthUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Height <br/>(" +
                                this.metricUnits.get("heightUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Volume <br/>(" +
                                this.metricUnits.get("volumeUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Weight <br/>(" +
                                this.metricUnits.get("weightUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        { name: "Conversion From", minWidth: "101px" },
                        { name: "Conversion To", minWidth: "101px" },
                        { name: "Conversion QTY", minWidth: "101px" },
                    ];

                    this.LinkedPUAndHU.headers = [
                        { name: "PU/HU Name", minWidth: "101px" },
                        { name: "Class", minWidth: "101px" },
                        { name: "Flex HU", minWidth: "101px" },
                        {
                            name:
                                "Length <br/> (" +
                                this.metricUnits.get("lengthUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Width <br/> (" +
                                this.metricUnits.get("widthUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Height <br/> (" +
                                this.metricUnits.get("heightUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Volume <br/> (" +
                                this.metricUnits.get("volumeUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Max Weight <br/>&nbsp;&nbsp;&nbsp; (" +
                                this.metricUnits.get("weightUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        { name: "Conversion From", minWidth: "101px" },
                        { name: "Min QTY", minWidth: "101px" },
                        { name: "Max QTY", minWidth: "101px" },
                    ];

                    this.UOMMetricHeaders = [
                        {
                            name:
                                "Length <br/> (" +
                                this.metricUnits.get("lengthUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Width <br/> (" +
                                this.metricUnits.get("widthUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Height <br/> (" +
                                this.metricUnits.get("heightUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Volume <br/> (" +
                                this.metricUnits.get("volumeUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Weight <br/> (" +
                                this.metricUnits.get("weightUnit") +
                                ")",
                            minWidth: "101px",
                        },
                    ];

                    this.UOMImperialHeaders = [
                        {
                            name:
                                "Length <br/> (" +
                                this.imperialUnits.get("lengthUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Width <br/> (" +
                                this.imperialUnits.get("widthUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Height <br/> (" +
                                this.imperialUnits.get("heightUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Volume <br/> (" +
                                this.imperialUnits.get("volumeUnit") +
                                ")",
                            minWidth: "101px",
                        },
                        {
                            name:
                                "Weight <br/> (" +
                                this.imperialUnits.get("weightUnit") +
                                ")",
                            minWidth: "101px",
                        },
                    ];
                });
            },
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    // Adding new rows, might need to be changed to pop up forms later
    onNewLinkedUOMRow() {
        let entry = new LinkedUOMRow();
        this.uom._linkedUOMRows?.push(entry);
    }

    onNewLinkedPUHURow() {
        let entry = new LinkedHuAndPuRow();
        //to-do : initialize the first dropdown value like above
        this.uom._linkedPUandHURows?.push(entry);
    }

    // helper : map appropriate linkedUOM values to _linkedUOMRows instance on uom
    // according to linkedUOMName
    mapLinkedUOMValues(linkedUOMName: string) {
        let match: LinkedUOMRow = this.linkedUOMs.get(linkedUOMName)?.clone()!;
        this.uom._linkedUOMRows = this.uom._linkedUOMRows.map(
            (elt: LinkedUOMRow) => {
                if (elt.linkedUOMName == linkedUOMName) {
                    match.conversionFrom = this.uom.longName;
                    return match;
                }
                elt.conversionFrom = this.uom.longName;
                return elt;
            }
        );
    }

    // Table manual bindings
    onLinkedUOMTableModelChange(event: any) {
        if (event.key == "linkedUOMName") {
            let count = 0;
            let linkedUOMName = event.value;
            this.uom._linkedUOMRows.forEach((elt: LinkedUOMRow) => {
                if (
                    elt.linkedUOMName == linkedUOMName &&
                    linkedUOMName != "--select--"
                ) {
                    count++;
                }
            });
            if (count >= 2) {
                this.uom._linkedUOMRows = this.uom._linkedUOMRows.map(
                    (elt: LinkedUOMRow) => {
                        if (
                            elt.linkedUOMName == linkedUOMName &&
                            elt.linkedUOMName != elt.conversionTo
                        ) {
                            elt.linkedUOMName = "--select--";
                        }
                        //cloning is intentionally done to force angular to detect changes
                        //incase user selects the duplicate linkedUOM name again
                        return elt.clone();
                    }
                );
                this.clearUnsetLinkedUOMs();
                this.onErrorResponse(
                    "this UOM is already selected for linking"
                );
            } else {
                if (linkedUOMName != undefined && linkedUOMName != "--select--")
                    this.mapLinkedUOMValues(linkedUOMName);
                else this.clearUnsetLinkedUOMs();
            }
        }
    }

    // When a linkedUOM row's linkedUOMName is unset, clear all the fields
    clearUnsetLinkedUOMs() {
        this.uom._linkedUOMRows = this.uom._linkedUOMRows.map(
            (elt: LinkedUOMRow) => {
                if (elt.linkedUOMName == "--select--")
                    return new LinkedUOMRow();
                else return elt;
            }
        );
    }

    // Update linkedUOM rows FROM field as parent UOM longName changes
    updateFromFieldForLinkedUOMs() {
        this.uom._linkedUOMRows.forEach((elt: LinkedUOMRow) => {
            elt.conversionFrom = this.uom.longName;
        });
    }

    // Manual bindigs
    onFormModelChange(event: any) {
        //auto populate longName and shortName
        if (["description", "id", "name"].includes(event.key)) {
            this.onUOMPropertiesChange();
        }

        // manually change UOM name values according to level
        if (event.key == "level") {
            this.uom["name"] = this.classNamesLookup.get(event.value);
            this.onUOMPropertiesChange();
        }

        if (event.key == "name") {
            this.classNamesLookup.forEach((value, key, map) => {
                if (value == event.value) {
                    this.uom["level"] = key;
                }
            });
            this.onUOMPropertiesChange();
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

    onRefresh() {
        this.uom = new UOM();
    }

    onSave() {
        this.validate();
        if (this.validationErrors.length > 0) {
            this.onErrorResponse(this.validationErrors[0]);
        } else
            this.uomService.save(this.uom).subscribe({
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

    //TODO
    onCancel() {
        this.router.navigate(["uom-list"]);
    }

    //TODO
    onApprove() {
        this.validate();
        if (this.validationErrors.length > 0) {
            this.onErrorResponse(this.validationErrors[0]);
        } else if (this.uom.id == "" || this.uom.id == undefined)
            this.onErrorResponse("Please provide the UOM details");
        else
            this.uomService.approve(this.uom.id).subscribe({
                next: (response) => {
                    if (response.status == 204) {
                        this.onSuccessfulApproval();
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
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["success-snackbar"],
        });
        //don't reset UOM on save -> commenting it out
        // this.uom = new UOM();
    }

    onSuccessfulApproval() {
        this.snackBar
            .openFromComponent(SnackbarComponent, {
                data: { message: "UOM successfully approved!", error: false },
                duration: 2000,
                horizontalPosition: "center",
                verticalPosition: "top",
                panelClass: ["success-snackbar"],
            })
            .afterDismissed()
            .subscribe(() => {
                this.router.navigate(["uom-list"]);
            });
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
            this.tabsToExclude = ["Linked PU and HU"];
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
            this.tabsToExclude = ["Linked PU and HU"];
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
        this.uom.shortName = `${this.uom.name} (${this.uom.id})`;
        this.updateFromFieldForLinkedUOMs();
    }

    validate() {
        this.validationErrors = [];
        let longName = this.uom.longName.trim();
        let shortName = this.uom.shortName.trim();
        if (longName.length > 30) {
            this.validationErrors.push(
                "Long name is invalid, must be maximum 30 characters long"
            );
        }

        if (shortName.length > 15)
            this.validationErrors.push(
                "Short name is invalid, must be maximum 15 characters long"
            );
    }
}
