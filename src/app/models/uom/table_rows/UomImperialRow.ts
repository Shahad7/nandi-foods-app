export class UOMImperialRow {
    metricSystem: string;
    private _lengthValue: number;
    private _widthValue: number;
    private _heightValue: number;
    private _volumeValue: number;
    private _weightValue: number;

    constructor(
        lengthValue: number = 0,
        widthValue: number = 0,
        heightValue: number = 0,
        weightValue: number = 0
    ) {
        this.metricSystem = "IMPERIAL";
        this._lengthValue = lengthValue;
        this._widthValue = widthValue;
        this._heightValue = heightValue;
        this._volumeValue = parseFloat(
            ((lengthValue * widthValue * heightValue) / 1728).toFixed(2)
        );
        this._weightValue = weightValue;
    }

    get lengthValue() {
        return this._lengthValue;
    }

    set lengthValue(value: number) {
        this._lengthValue = value;
        this.updateVolume();
    }

    get widthValue() {
        return this._widthValue;
    }

    set widthValue(value: number) {
        this._widthValue = value;
        this.updateVolume();
    }

    get heightValue() {
        return this._heightValue;
    }

    set heightValue(value: number) {
        this._heightValue = value;
        this.updateVolume();
    }

    get volumeValue() {
        return this._volumeValue;
    }

    get weightValue() {
        return this._weightValue;
    }

    set weightValue(value: number) {
        this._weightValue = value;
    }

    private updateVolume() {
        this._volumeValue = parseFloat(
            (
                (this._lengthValue * this._widthValue * this._heightValue) /
                1728
            ).toFixed(2)
        );
    }
    toJSON() {
        return {
            metricSystem: this.metricSystem,
            lengthValue: this.lengthValue,
            widthValue: this.widthValue,
            heightValue: this.heightValue,
            volumeValue: this.volumeValue,
            weightValue: this.weightValue,
        };
    }

    clone(): UOMImperialRow {
        const cloned = new UOMImperialRow(
            this._lengthValue,
            this._widthValue,
            this._heightValue,
            this._weightValue
        );
        return cloned;
    }
}
