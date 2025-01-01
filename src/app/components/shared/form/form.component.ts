import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormInputData } from "../../../types/form-types";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrl: "./form.component.css",
})
export class FormComponent {
    /**
         Entity or model to which fields have to be binded to
        */
    @Input("model")
    model: any;

    /** Layout value for ui5-form */
    @Input("layout")
    layout: string | undefined = undefined;

    /** LableSpan value for ui5-form */
    @Input("labelSpan")
    labelSpan: string | undefined = undefined;

    @Input("editingEnabled")
    editingEnabled: boolean = true;

    /** 
         Fields to exclude dynamically
        */
    @Input("excluded")
    excluded: Array<string> = [];

    @Input("formData")
    formData: FormInputData = [];

    /** Event which alerts parent component about the changed value and respective key
     * so that parent component can change the state accordingly or
     * apply changes to the original model variable
     */
    @Output()
    onModelChange = new EventEmitter<any>();

    alertModelChange(key: any, value: any) {
        this.onModelChange.emit({ key, value });
    }

    onBooleanChange(key: string, value: any) {
        this.model[key] = value.toString() === "true" || value == true;
    }
}
