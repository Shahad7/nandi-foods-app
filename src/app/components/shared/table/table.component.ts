import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrl: "./table.component.css",
})
export class TableComponent {
    /**
     * Whether if the table fields are input fields or readonly values (normal tables; no binding)
     */
    @Input()
    controlled: boolean = false;

    /**
     * Whether if the delete button for all rows should be enabled
     */
    @Input()
    enableDelete: boolean = false;

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
     * Delete rows in the table and fire onModelChange
     */
    deleteRow(index: number) {
        this.rows.splice(index, 1);
        this.onModelChange.emit(this.rows);
    }

    /**
     * Add new row to the table and fire onModelChange
     */
    addNewRow() {
        this.onModelChange.emit(this.rows);
    }
}
