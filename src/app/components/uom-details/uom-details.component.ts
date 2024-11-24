import { UomService } from "./../../services/uom.service";
import { MainCommunicationService } from "./../../services/main-communication.service";
import {
    BootstrapOptions,
    Component,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { UOMImperialRow } from "../../models/uom/table_rows/UomImperialRow";
import { UOMMetricRow } from "../../models/uom/table_rows/UomMetricRow";
import { LinkedUOMRow } from "../../models/uom/table_rows/linkedUomRow";
import { LinkedHuAndPuRow } from "../../models/uom/table_rows/linkedHuAndPuRow";
import { EventEmitter } from "stream";
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UOM } from "../../models/uom/uom";
import { CreateNewUomComponent } from "../create-new-uom/create-new-uom.component";
import { MatSnackBar } from "@angular/material/snack-bar";

interface RowType {
    [key: string]: any; // Allow dynamic access to row properties
}
@Component({
    selector: "app-uom-details",
    templateUrl: "./uom-details.component.html",
    styleUrl: "./uom-details.component.css",
})
export class UomDetailsComponent extends CreateNewUomComponent implements OnInit  {
    //enable/disable edit
    editingEnabled: boolean = false;
    override title: string = "UOM Details";

    //read-only
    lastUpdatedBy: string = "";
    dateCreated: string = "";
    effectiveDate: string = "";
    lastUpdated: string = "";
    status: string = "";
    statuses = []

    //TO-DO 
    //fetch statuses, levels

    constructor( mainCommunicationService: MainCommunicationService,
    route: ActivatedRoute,
    uomService: UomService,
    snackBar: MatSnackBar){
    super(mainCommunicationService, route,uomService,snackBar)
       
   }
    override ngOnInit(): void {
        super.ngOnInit()
        let UOMId = this.route.snapshot.paramMap.get("UOMId");
        if (UOMId != "" && UOMId != undefined) {
            this.uom = this.uomService.getUOMById(UOMId as any);
            
        }
        this.onUOMPropertiesChange();
    }

    override onSave() {
        
    }

    //let appropriate child component know when edit is clicked
    onEdit() {
        this.editingEnabled = !this.editingEnabled;
    }

   
}
