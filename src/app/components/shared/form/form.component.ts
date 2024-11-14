import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrl: "./form.component.css",
})
export class FormComponent {
    //the entity or model to which fields have to be binded to
    @Input("model")
    model: any;
    //to allow ng-content inside the form component - should refactor if there are more cases
    @Input("projectionEnabled")
    projectionEnabled: boolean = true;
    @Input("editingEnabled")
    editingEnabled: boolean = true;
    //fields to exclude dynamically
    @Input("excluded")
    excluded: Array<string> = [];

    /* all form groups and form field key names and types
     *eg:- formData = [
            [
            {key:'name',type:'string',label:'Name',required:true,editable:true},
            {key:'password',type:'password',label:'Password',required:true,editable:true},
            {key:'country',type:'dropdown',label:'Country',required:true,editable:true, values:['IND','AUS']}                        
            ],..
        ]
                           
    * types : number, string, boolean, dropdown, password
    */

    @Input("formData")
    formData: any;

    //event which alerts parent component about the changed value and respective key
    //so that parent component can change the state accordingly or
    //apply changes to the original model variable
    @Output()
    onModelChange = new EventEmitter<any>();

    alertModelChange(key: any, value: any) {
        this.onModelChange.emit({ key, value });
    }
}
