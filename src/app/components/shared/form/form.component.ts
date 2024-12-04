import { Component, EventEmitter, Input, Output } from "@angular/core";

type formGroup = {
    headerText: string | undefined;
    columnSpan: number | undefined;
    content: any;
};

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

    /** 
     *  formData is an array of formGroups where each formGroup contains headerText, columnSpan 
     *  for that formGroup and the content which is an array of objects containing key, type,
     *  label, required, editable, placeholder, values etc for each of the formFields
     *  Eg:- formData = [
     *      {
     *          headerText : 'User Details', //could be undefined
     *          columnSpan : 2, //could also be undefined
     *          content : 
                        [
                        {key:'name',type:'string',label:'Name',required:true,editable:true,placeholder:'Adam'},
                        {key:'password',type:'password',label:'Password',required:true,editable:true},
                        {key:'country',type:'dropdown',label:'Country',required:true,editable:true, values:['IND','AUS']}                        
                        ],..
            }
        ]
                           
     *  Available Types : number, string, boolean, dropdown, password
        */

    @Input("formData")
    formData: Array<formGroup> = [];

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
