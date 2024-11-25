import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
    selector: "app-image-upload",
    templateUrl: "./image-upload.component.html",
    styleUrl: "./image-upload.component.css",
})
export class ImageUploadComponent {
    /**Image upload button dialog */
    @Input()
    title: string = "Upload image here";

    @Input()
    accept: string | undefined = undefined;

    /** Fired when image/file is uploaded, also triggered when Cancel is clicked */
    @Output()
    onImageChange = new EventEmitter<any>();

    relayInputChange(event: any) {
        this.onImageChange.emit(event);
    }

    onDragLeave(event: any) {
        event.preventDefault();
        event.stopPropagation();
    }

    onDragOver(event: any) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
        event.dataTransfer.effectAllowed = "all";
    }

    onDragStart(event: any) {
        event.dataTransfer.dropEffect = "copy";
        event.dataTransfer.effectAllowed = "all";
    }

    onFileDrop(event: any) {
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer.files.length > 0) {
            this.relayInputChange(event.dataTransfer.files);
        }
    }

    onFileInput(event: any) {
        this.relayInputChange(event.files);
    }
}
