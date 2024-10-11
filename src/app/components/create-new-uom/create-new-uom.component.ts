import { BootstrapOptions, Component } from "@angular/core";
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-create-new-uom",
    templateUrl: "./create-new-uom.component.html",
    styleUrl: "./create-new-uom.component.css",
})
export class CreateNewUomComponent {
    currentDate: any;

    classInp: any = "UOM";
    UOMType: any = "EACH";
    UOMDescription: string = "1 x 4LB";
    UOMLongName: string = "U1020 EACH (1 x 4LB)";
    isInventoryUOM: boolean = true;
    isPurchaseUOM: boolean = false;
    UOMLevel: string = "Level 1";
    UOMID: string = "U1020";
    UOMShortName: string = "EACH (U1020)";
    isProductionUOM: boolean = true;
    isSalesUOM: boolean = true;

    //read-only
    lastUpdatedBy: string = "John Doe";
    dateCreated: string = "2024-06-27";
    effectiveDate: string = "2024-06-27";
    lastUpdated: string = "2024-06-27";
    status: string = "ACTIVE";

    constructor(private datePipe: DatePipe) {
        this.currentDate = this.datePipe.transform(new Date(), "y/M/d");
    }
}
