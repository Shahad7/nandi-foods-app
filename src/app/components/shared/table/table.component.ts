import { DecimalPipe } from "@angular/common";
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { TableHeader, TableKey, TableRow } from "../../../types/table-types";

type Sort = {
    direction: "asc" | "desc" | "";
    active: string;
};

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrl: "./table.component.css",
})
export class TableComponent {
    /** Title of the table */
    @Input()
    title: string = "";

    /** Whether to enable sort by column for the table */
    @Input()
    enableSortByColumn: boolean = false;

    /** Whether if ui5 loading indicator should be shown */
    @Input()
    loading: boolean = false;

    /**
     * Whether if the table fields are input fields or readonly values (normal tables; no binding)
     */
    @Input()
    controlled: boolean = true;

    /**
     * Fired when a row is clicked, relays the row data
     */
    @Output()
    onRowClick: EventEmitter<any> = new EventEmitter();

    /**
     * Fired as any equivalent to matSortChange event manually since it can't be captured
     * in ngx sap-ui5 elements, with sort data of type Sort in the original library
     */
    @Output()
    onSortChange: EventEmitter<Sort> = new EventEmitter();

    /**
     * Whether editing is enabled by default or not, defaults to true
     */
    @Input()
    editingEnabled: boolean = true;

    /**
     * Whether if the delete button for all rows should be enabled
     */
    @Input()
    enableDelete: boolean = false;

    /**
     * Whether if the add new row button should be enabled
     */
    @Input()
    enableAdd: boolean = false;

    /**
     * Whether if it's a paginated table
     */
    @Input()
    paginated: boolean = false;

    /**
     * Set what should be displayed when no records are found in search
     */
    @Input()
    noDataText: string = "No Match Found";

    /**
     * Headers of the table
     */
    @Input()
    headers: TableHeader[] = [];

    /**
     * Rows of the table
     */
    @Input()
    rows: TableRow[] = [];

    /**
     * Keys of the model
     */
    @Input()
    keys: TableKey[] = [];

    /**
     *
     * Event which passes the new model data to parent component for manual binding
     */
    @Output()
    onTableModelChange = new EventEmitter<any>();

    /**
     *
     * Fired on pagination events to relay the event details
     */
    @Output()
    onPaginationEvent = new EventEmitter<any>();

    /**Fired when Add new row button is clicked, useful when the behaviour is to pop up a form etc */
    @Output()
    onAddNewRow = new EventEmitter<any>();

    /** Paginator properties */
    @Input()
    paginatorProps: any = {};

    pageEvent!: PageEvent;

    constructor(private decimalPipe: DecimalPipe) {}

    /** Fires when the current page is changed */
    relayPageEvent(e: PageEvent) {
        this.onPaginationEvent.emit(e);
    }

    alertRowClick(data: any) {
        this.onRowClick.emit(data);
    }

    /**
     * Incase of both methods below, parent component need not be alerted
     * Since changes made to rows object is reflected directly in parent
     * as both child and parent point to the same object
     */

    /**
     * Delete rows in the table
     */
    deleteRow(index: number) {
        this.rows.splice(index, 1);
    }

    /**
     * Alerts parent component when new row button is clicked
     */
    addNewRow() {
        this.onAddNewRow.emit("");
    }

    /** Alert parent component of any ngModel changes */
    alertModelChange(key: string, value: string) {
        this.onTableModelChange.emit({ key, value });
    }

    limitDecimals(element: any, event: any) {
        //console.log(event);

        const inputValue = parseFloat(
            Number(event.target.value.replace(",", ".")).toFixed(2)
        );
        if (
            event.data != "." &&
            event.data != "," &&
            event.inputType != "deleteContentBackward" &&
            !isNaN(inputValue)
        ) {
            element.value = inputValue;
        }
    }

    onDecimalChange(row: any, key: string, value: any) {
        let transformedValue = parseFloat(Number(value).toFixed(2));
        row[key] = transformedValue;
    }

    sortData(pointerEvent: any, sortHeaderElt: any) {
        let _sort = sortHeaderElt._sort;
        let direction = null;
        let active = null;
        if (_sort) {
            direction = _sort.direction;
            active = _sort.active;
            this.onSortChange.emit({ direction, active });
        }
    }
}
