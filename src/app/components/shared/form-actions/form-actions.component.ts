import { Component, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
    selector: "app-form-actions",
    templateUrl: "./form-actions.component.html",
    styleUrl: "./form-actions.component.css",
})
export class FormActionsComponent {
    /**Fired when Cancel button is clicked */
    @Output()
    onCancel = new EventEmitter<any>();

    /**Fired when Save button is clicked */
    @Output()
    onSave = new EventEmitter<any>();

    /**Fired when Approve button is clicked */
    @Output()
    onApprove = new EventEmitter<any>();

    alertCancel() {
        this.onCancel.emit("");
    }

    alertSave() {
        this.onSave.emit("");
    }

    alertApprove() {
        this.onApprove.emit("");
    }
}
