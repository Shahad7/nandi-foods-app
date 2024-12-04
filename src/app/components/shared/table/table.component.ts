import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrl: "./table.component.css",
})
export class TableComponent {
    /** Title of the table */
    @Input()
    title: string = "";

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
     * Headers of the table
     * Format  :- [{table_header_name, minWidth}]
     * Eg:- [{name:"class",minWidth:120},{name:'Width CM',minWidth:0}]
     */
    @Input()
    headers: Array<any> = [];

    /**
     * Rows of the table
     */
    @Input()
    rows: Array<any> = [];

    /**
     * Keys of the model with it's name, type and whether it's editable
     * Format  :- [{key_name,key_type,editable}]
     * Eg:- [name:'width',type:'number',editable:true]
     * Available types :- boolean, string, number, dropdown (add values in appropriate key as an array)
     */
    @Input()
    keys: Array<any> = [];

    /**
     *
     * Event which passes the new model data to parent component for manual binding
     */
    @Output()
    onModelChange = new EventEmitter<any>();

    /**
     *
     * Fired on pagination events to relay the event details
     */
    @Output()
    onPaginationEvent = new EventEmitter<any>();

    /**Fired when Add new row button is clicked, useful when the behaviour is to pop up a form etc */
    @Output()
    onAddNewRow = new EventEmitter<any>();

    /**
     * Paginator properties
     * Eg:-  paginatorProps = {
                length: 200,
                pageSize: 10,
                pageIndex: 0,
                pageSizeOptions: [10, 20, 30, 40, 50],
                hidePageSize: false,
                showPageSizeOptions: true,
                showFirstLastButtons: true,
                disabled: false,
            };
     */
    @Input()
    paginatorProps: any = {};

    pageEvent!: PageEvent;

    relayPageEvent(e: PageEvent) {
        this.onPaginationEvent.emit(e);
    }

    alertRowClick(data: any) {
        this.onRowClick.emit(data);
    }

    //for sample
    // handlePageEvent(e: PageEvent) {
    //     this.paginatorProps.pageEvent = e (avoid storing the event)
    //     this.paginatorProps.length = e.length;
    //     this.paginatorProps.pageSize = e.pageSize;
    //     this.paginatorProps.pageIndex = e.pageIndex;
    // }

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
     * Add new row to the table and fire onModelChange
     * Needs more clarification for this method :-
     * It's not clear how Add new row button should behave in case of tables
     * like LinkedUOM names table. How the values should be saved? etc
     * Might be able to completely remove the classRef input
     * if default behaviour is to pop up a form
     * for temporary purpose, onAddNewButton logic could be moved to parent components
     * since it can't be generalized
     */
    addNewRow() {
        this.onAddNewRow.emit("");
    }
}
