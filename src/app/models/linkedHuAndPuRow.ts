export class LinkedHuAndPuRow {
    puOrHuName: string;
    className: string;
    flexHU: boolean;
    _lengthCm: number;
    _widthCm: number;
    _heightCm: number;
    _volumeM3: number;
    maxWeightKG: number;
    conversionFrom: string;
    minQTY: number;
    maxQTY: number;

    // Constructor with default values
    constructor(
        puOrHuName: string = "",
        className: string = "",
        flexHU: boolean = true,
        _lengthCm: number = 0,
        _widthCm: number = 0,
        _heightCm: number = 0,
        _volumeM3: number = 0,
        maxWeightKG: number = 0,
        conversionFrom: string = "",
        minQTY: number = 0,
        maxQTY: number = 0
    ) {
        this.puOrHuName = puOrHuName;
        this.className = className;
        this.flexHU = flexHU;
        this._lengthCm = _lengthCm;
        this._widthCm = _widthCm;
        this._heightCm = _heightCm;
        this._volumeM3 = _heightCm * _widthCm * _lengthCm;
        this.maxWeightKG = maxWeightKG;
        this.conversionFrom = conversionFrom;
        this.minQTY = minQTY;
        this.maxQTY = maxQTY;
    }

    get volumeM3() {
        return this._volumeM3;
    }

    get widthCm() {
        return this._widthCm;
    }

    get heightCm() {
        return this._heightCm;
    }
    get lengthCm() {
        return this._lengthCm;
    }

    set widthCm(value: number) {
        this._widthCm = value;
        this.updateVolume();
    }

    set heightCm(value: number) {
        this._heightCm = value;
        this.updateVolume();
    }

    set lengthCm(value: number) {
        this._lengthCm = value;
        this.updateVolume();
    }

    updateVolume() {
        this._volumeM3 = this._widthCm * this._heightCm * this._lengthCm;
    }
}
