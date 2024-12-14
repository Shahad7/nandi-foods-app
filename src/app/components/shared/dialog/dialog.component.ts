import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Output,
    inject,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    MatDialogRef,
    MatDialogTitle,
} from "@angular/material/dialog";

@Component({
    selector: "app-dialog",
    standalone: true,
    templateUrl: "./dialog.component.html",
    styleUrl: "./dialog.component.css",
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        MatDialogModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
    readonly dialogRef = inject(MatDialogRef<DialogComponent>);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { message: string; title: string }
    ) {}

    onConfirmation() {
        alert("emitting...");
        this.dialogRef.close("proceed");
    }
}
