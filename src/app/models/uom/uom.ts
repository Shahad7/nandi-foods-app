import { LinkedUOM } from "./linkedUOM";
import { UOMImperialRow } from "./table_rows/UomImperialRow";
import { UOMMetricRow } from "./table_rows/UomMetricRow";

export class UOM {
    level: string;
    type: string;
    name: string;
    description: string;
    longName: string;
    shortName: string;
    //fix : changes in metric and imperial fields
    measuredValues?: Array<UOMImperialRow | UOMMetricRow | undefined>;
    bulkCode: string;
    isInventory: boolean;
    isPurchase: boolean;
    isSales: boolean;
    isProduction: boolean;
    //temporarily making linkedUOMs optional
    linkedUOMs?: LinkedUOM[];
    linkedPUHUs?: any;
    id: string;
    effectiveDate?: string;

    constructor(
        level: string = "Level 1",
        name: string = "EACH",
        type: string = "",
        description: string = "",
        longName: string = "",
        shortName: string = "",
        //default value of bulkCode has to be changed
        bulkCode: string = "1",
        isInventory: boolean = false,
        isPurchase: boolean = false,
        isSales: boolean = false,
        isProduction: boolean = false,
        linkedUOMs: LinkedUOM[] = [],
        id: string = "",
        effectiveDate = new Date().toISOString().split("T")[0]
    ) {
        this.level = level;
        this.type = type;
        this.name = name;
        this.description = description;
        this.longName = longName;
        this.shortName = shortName;
        this.bulkCode = bulkCode;
        this.isInventory = isInventory;
        this.isPurchase = isPurchase;
        this.isSales = isSales;
        this.isProduction = isProduction;
        this.linkedUOMs = linkedUOMs;
        this.id = id;
        this.effectiveDate = effectiveDate;
    }
}
