export class LinkedUOMRow {
    linkedUOMName: string;
    lengthCm: number;
    widthCm: number;
    heightCm: number;
    volumeM3: number;
    weightKg: number;
    conversionFrom: string;
    conversionTo: string;
    conversionQTY: number;

    // Constructor with default values
    constructor(
        linkedUOMName: string = "", // Default to empty string
        lengthCm: number = 0, // Default to 0
        widthCm: number = 0, // Default to 0
        heightCm: number = 0, // Default to 0
        volumeM3: number = 0, // Default to 0
        weightKg: number = 0, // Default to 0
        conversionFrom: string = "", // Default to empty string
        conversionTo: string = "", // Default to empty string
        conversionQTY: number = 0 // Default to 0
    ) {
        this.linkedUOMName = linkedUOMName;
        this.lengthCm = lengthCm;
        this.widthCm = widthCm;
        this.heightCm = heightCm;
        this.volumeM3 = volumeM3;
        this.weightKg = weightKg;
        this.conversionFrom = conversionFrom;
        this.conversionTo = conversionTo;
        this.conversionQTY = conversionQTY;
    }
}
