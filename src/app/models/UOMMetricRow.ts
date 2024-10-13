export class UOMMetricRow {
    lengthCm: number;
    widthCm: number;
    heightCm: number;
    volumeM3: number;
    weightKg: number;

    constructor(
        lengthCm: number = 0,
        widthCm: number = 0,
        heightCm: number = 0,
        volumeM3: number = 0,
        weightKg: number = 0
    ) {
        this.lengthCm = lengthCm;
        this.widthCm = widthCm;
        this.heightCm = heightCm;
        this.volumeM3 = volumeM3;
        this.weightKg = weightKg;
    }
}
