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

    /**
     * Whether if the table fields are input fields or readonly values (normal tables; no binding)
     */
    @Input()
    controlled: boolean = false;

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
     * Reference to the class of the row model
     */
    @Input()
    classRef: any;

    /**
     *
     * Event which passes the new model data to parent component for manual binding
     */
    @Output()
    onModelChange = new EventEmitter<any>();

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

    handlePageEvent(e: PageEvent) {
        this.paginatorProps.pageEvent = e;
        this.paginatorProps.length = e.length;
        this.paginatorProps.pageSize = e.pageSize;
        this.paginatorProps.pageIndex = e.pageIndex;
    }

    /** TODO:-
     * bind a function to handle ngModelChanges in all sort of input elements
     * change how row changes are relayed to parent component
     * correct add new row button behaviour
     * relay whole current rows or specific changes only?
     */

    /**
     * Fires onModelChange event with type : 'push'|'pop'|'input_change',
     * and ID of row incase of pop, row ID & key value pair incase of input_change
     * and newly added row incase of push
     */
    alertChange(type: string, data: any) {}

    /**
     * Incase of both methods below, parent component need not be alerted
     * Since changes made to rows object is reflected directly in parent
     * as both child and parent point to the same object
     */

    /**
     * Delete rows in the table and fire onModelChange
     */
    deleteRow(index: number) {
        this.rows.splice(index, 1);
        // this.onModelChange.emit(this.rows);
    }

    /**
     * Add new row to the table and fire onModelChange
     */
    addNewRow() {
        this.rows.push(new this.classRef());
        // this.onModelChange.emit(this.rows);
    }
}
