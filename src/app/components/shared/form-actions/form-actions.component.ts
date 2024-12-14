import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    inject,
} from "@angular/core";
import { EventEmitter } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { NoopScrollStrategy } from "@angular/cdk/overlay";

@Component({
    selector: "app-form-actions",
    templateUrl: "./form-actions.component.html",
    styleUrl: "./form-actions.component.css",
})
export class FormActionsComponent {
    /**Action buttons to be included */
    @Input()
    include = ["cancel", "save", "approve"];

    /**Form entity name, eg :- uom, customer, warehouse etc */
    @Input()
    name: string = "";

    /**Fired when Cancel button is clicked */
    @Output()
    onCancel = new EventEmitter<any>();

    /**Fired when Save button is clicked */
    @Output()
    onSave = new EventEmitter<any>();

    /**Fired when Approve button is clicked */
    @Output()
    onApprove = new EventEmitter<any>();

    /**Fired when Delete button is clicked */
    @Output()
    onDelete = new EventEmitter<any>();

    readonly dialogService = inject(MatDialog);
    dialogRef!: MatDialogRef<DialogComponent, String>;

    constructor() {}

    alertCancel() {
        this.onCancel.emit("");
    }

    alertSave() {
        this.onSave.emit("");
    }

    alertApprove() {
        this.onApprove.emit("");
    }

    confirmDelete() {
        this.openDialog("0ms", "0ms");
    }

    openDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ): void {
        this.dialogRef = this.dialogService.open(DialogComponent, {
            data: {
                title: `Delete ${this.name}`,
                message: `Are you sure you want to delete this ${this.name}?`,
            },

            height: "160px",
            enterAnimationDuration,
            exitAnimationDuration,
            scrollStrategy: new NoopScrollStrategy(),
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response == "proceed") {
                this.alertDelete();
            }
        });
    }

    alertDelete() {
        this.onDelete.emit("");
    }
}
