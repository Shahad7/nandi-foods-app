export class MetricImperialRow {
    lengthIn: number;
    widthIn: number;
    heightIn: number;
    volumeFt3: number;
    weightLb: number;

    constructor(
        lengthIn: number = 0,
        widthIn: number = 0,
        heightIn: number = 0,
        volumeFt3: number = 0,
        weightLb: number = 0
    ) {
        this.lengthIn = lengthIn;
        this.widthIn = widthIn;
        this.heightIn = heightIn;
        this.volumeFt3 = volumeFt3;
        this.weightLb = weightLb;
    }
}
