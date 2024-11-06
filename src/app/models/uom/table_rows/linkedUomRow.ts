export class LinkedUOMRow {
    id: string;
    linkedUOMName: string;
    _lengthCm: number;
    _widthCm: number;
    _heightCm: number;
    _volumeM3: number;
    weightKg: number;
    conversionFrom: string;
    conversionTo: string;
    conversionQTY: number;

    // Constructor with default values
    constructor(
        id: string = "",
        linkedUOMName: string = "",
        _lengthCm: number = 0,
        _widthCm: number = 0,
        _heightCm: number = 0,
        _volumeM3: number = 0,
        weightKg: number = 0,
        conversionFrom: string = "",
        conversionTo: string = "",
        conversionQTY: number = 0
    ) {
        this.id = id;
        this.linkedUOMName = linkedUOMName;
        this._lengthCm = _lengthCm;
        this._widthCm = _widthCm;
        this._heightCm = _heightCm;
        this._volumeM3 = (_heightCm * _widthCm * _lengthCm) / 1000000;
        this.weightKg = weightKg;
        this.conversionFrom = conversionFrom;
        this.conversionTo = conversionTo;
        this.conversionQTY = conversionQTY;
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
        this._volumeM3 =
            (this._widthCm * this._heightCm * this._lengthCm) / 1000000;
    }
}
