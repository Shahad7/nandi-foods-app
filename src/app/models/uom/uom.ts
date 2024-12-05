import { UOMImperialRow } from "./table_rows/UomImperialRow";
import { UOMMetricRow } from "./table_rows/UomMetricRow";

export class UOM {
    level: string;
    name: string;
    description: string;
    longName: string;
    shortName: string;
    metric: UOMMetricRow;
    imperial: UOMImperialRow;
    bulkCode: string;
    isInventory: boolean;
    isPurchase: boolean;
    isSales: boolean;
    isProduction: boolean;
    linkedUOMs: LinkedUOM[];
    id: string;

    constructor(
        level: string = "Level 1",
        name: string = "EACH",
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
        id: string = ""
    ) {
        this.level = level;
        this.name = name;
        this.description = description;
        this.longName = longName;
        this.shortName = shortName;
        this.metric = new UOMMetricRow();
        this.imperial = new UOMImperialRow();
        this.bulkCode = bulkCode;
        this.isInventory = isInventory;
        this.isPurchase = isPurchase;
        this.isSales = isSales;
        this.isProduction = isProduction;
        this.linkedUOMs = linkedUOMs;
        this.id = id;
    }
}
class LinkedUOM {
    id: string;
    quantity: number;

    constructor(id: string = "", quantity: number = 0) {
        this.id = id;
        this.quantity = quantity;
    }
}
