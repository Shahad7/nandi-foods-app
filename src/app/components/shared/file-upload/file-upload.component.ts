import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.component.html",
    styleUrl: "./file-upload.component.css",
})
export class FileUploadComponent {
    @ViewChild("fileUpload")
    fileUpload: any;

    /** File name need to be passed for displaying */
    @Input()
    fileName: string | undefined = undefined;

    /** Comma separated list of accepted file extensions (no space characters) */
    @Input()
    accept: string = "*";

    /** Fired when the file is submitted, relays the file in the event */
    @Output()
    onFileSubmit = new EventEmitter<any>();

    triggerFileUpload() {
        this.fileUpload.nativeElement.click();
    }

    alertFileSubmit(event: any) {
        this.onFileSubmit.emit(event.target?.files);
    }
}
