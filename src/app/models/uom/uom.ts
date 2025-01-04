import { LinkedUOM } from "./linkedUOM";
import { UOMImperialRow } from "./table_rows/UomImperialRow";
import { UOMMetricRow } from "./table_rows/UomMetricRow";
import { LinkedHuAndPuRow } from "./table_rows/linkedHuAndPuRow";
import { LinkedUOMRow } from "./table_rows/linkedUomRow";

// All fields starting with an underscore are non-entity fields

export class UOM {
    level: string;
    name: string;
    description: string;
    longName: string;
    shortName: string;
    measuredValues?: Array<UOMImperialRow | UOMMetricRow | undefined>;
    bulkCode: string;
    isInventory: boolean;
    isPurchase: boolean;
    isSales: boolean;
    isProduction: boolean;
    linkedUOMs?: LinkedUOM[];
    linkedPUHUs?: any;
    id: string;
    effectiveDate?: string;
    status?: string;

    // non-entity fields
    _metric: UOMMetricRow = new UOMMetricRow();
    _imperial: UOMImperialRow = new UOMImperialRow();
    _linkedUOMRows: Array<LinkedUOMRow> = [];
    _linkedPUandHURows: Array<LinkedHuAndPuRow> = [];

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
        id: string = "",
        effectiveDate = new Date().toISOString().split("T")[0],
        status: string = "PENDING"
    ) {
        this.level = level;
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
        this.status = status;
    }

    toJSON() {
        return Object.fromEntries(
            Object.entries(this).filter(
                ([key, value]) =>
                    !key.startsWith("_") &&
                    value !== undefined &&
                    value !== "" &&
                    !(Array.isArray(value) && value.length === 0)
            )
        );
    }

    clone(): UOM {
        const cloned = new UOM(
            this.level,
            this.name,
            this.description,
            this.longName,
            this.shortName,
            this.bulkCode,
            this.isInventory,
            this.isPurchase,
            this.isSales,
            this.isProduction,
            this.linkedUOMs
                ? this.linkedUOMs.map((uom) =>
                      Object.assign(new LinkedUOM(), uom)
                  )
                : [],
            this.id,
            this.effectiveDate,
            this.status
        );

        // Manually clone UOMMetricRow
        cloned._metric = this._metric.clone();

        // Manually clone UOMImperialRow
        cloned._imperial = this._imperial.clone();
        cloned.measuredValues = [cloned._imperial, cloned._metric];
        // Clone other rows
        cloned._linkedUOMRows = this._linkedUOMRows.map((row) => row.clone());
        cloned._linkedPUandHURows = this._linkedPUandHURows.map((row) =>
            row.clone()
        );

        return cloned;
    }
}
