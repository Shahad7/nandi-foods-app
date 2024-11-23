import { Component, EventEmitter, Input, Output } from "@angular/core";

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
    /**
         To allow ng-content inside the form component - should refactor if there are more cases
        */
    @Input("projectionEnabled")
    projectionEnabled: boolean = true;

    @Input("editingEnabled")
    editingEnabled: boolean = true;

    /** 
         Fields to exclude dynamically
        */
    @Input("excluded")
    excluded: Array<string> = [];

    /** 
     *  All form groups and form field key names and types
     *  Eg:- formData = [
            [
            {key:'name',type:'string',label:'Name',required:true,editable:true,placeholder:'Adam'},
            {key:'password',type:'password',label:'Password',required:true,editable:true},
            {key:'country',type:'dropdown',label:'Country',required:true,editable:true, values:['IND','AUS']}                        
            ],..
        ]
                           
     *  Available Types : number, string, boolean, dropdown, password
        */

    @Input("formData")
    formData: any;

    /** Event which alerts parent component about the changed value and respective key
     * so that parent component can change the state accordingly or
     * apply changes to the original model variable
     */
    @Output()
    onModelChange = new EventEmitter<any>();

    alertModelChange(key: any, value: any) {
        this.onModelChange.emit({ key, value });
    }
}
