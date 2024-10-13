export class LinkedHuAndPuRow {
    puOrHuName: string;
    className: string;
    flexHU: boolean;
    lengthCm: number;
    widthCm: number;
    heightCm: number;
    volumeM3: number;
    maxWeightKG: number;
    conversionFrom: string;
    minQTY: number;
    maxQTY: number;

    // Constructor with default values
    constructor(
        puOrHuName: string = "",
        className: string = "",
        flexHU: boolean = true,
        lengthCm: number = 0,
        widthCm: number = 0,
        heightCm: number = 0,
        volumeM3: number = 0,
        maxWeightKG: number = 0,
        conversionFrom: string = "",
        minQTY: number = 0,
        maxQTY: number = 0
    ) {
        this.puOrHuName = puOrHuName;
        this.className = className;
        this.flexHU = flexHU;
        this.lengthCm = lengthCm;
        this.widthCm = widthCm;
        this.heightCm = heightCm;
        this.volumeM3 = volumeM3;
        this.maxWeightKG = maxWeightKG;
        this.conversionFrom = conversionFrom;
        this.minQTY = minQTY;
        this.maxQTY = maxQTY;
    }
}
