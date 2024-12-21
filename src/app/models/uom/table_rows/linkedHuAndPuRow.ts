export class LinkedHuAndPuRow {
    id: string;
    puOrHuName: string;
    className: string;
    flexHU: boolean;
    _lengthValue: number;
    _widthValue: number;
    _heightValue: number;
    _volumeValue: number;
    maxWeightKG: number;
    conversionFrom: string;
    minQTY: number;
    maxQTY: number;

    // Constructor with default values
    constructor(
        id: string = "",
        puOrHuName: string = "",
        className: string = "",
        flexHU: boolean = true,
        _lengthValue: number = 0,
        _widthValue: number = 0,
        _heightValue: number = 0,
        _volumeValue: number = 0,
        maxWeightKG: number = 0,
        conversionFrom: string = "",
        minQTY: number = 0,
        maxQTY: number = 0
    ) {
        this.id = id;
        this.puOrHuName = puOrHuName;
        this.className = className;
        this.flexHU = flexHU;
        this._lengthValue = _lengthValue;
        this._widthValue = _widthValue;
        this._heightValue = _heightValue;
        this._volumeValue = _heightValue * _widthValue * _lengthValue;
        this.maxWeightKG = maxWeightKG;
        this.conversionFrom = conversionFrom;
        this.minQTY = minQTY;
        this.maxQTY = maxQTY;
    }

    get volumeValue() {
        return this._volumeValue;
    }

    get widthValue() {
        return this._widthValue;
    }

    get heightValue() {
        return this._heightValue;
    }

    get lengthValue() {
        return this._lengthValue;
    }

    set widthValue(value: number) {
        this._widthValue = value;
        this.updateVolume();
    }

    set heightValue(value: number) {
        this._heightValue = value;
        this.updateVolume();
    }

    set lengthValue(value: number) {
        this._lengthValue = value;
        this.updateVolume();
    }

    updateVolume() {
        this._volumeValue =
            this._widthValue * this._heightValue * this._lengthValue;
    }
}
