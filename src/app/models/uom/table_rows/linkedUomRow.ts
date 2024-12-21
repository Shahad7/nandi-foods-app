export class LinkedUOMRow {
    id: string;
    linkedUOMName: string;
    _lengthValue: number;
    _widthValue: number;
    _heightValue: number;
    _volumeValue: number;
    weightKg: number;
    conversionFrom: string;
    conversionTo: string;
    conversionQTY: number;

    // Constructor with default values
    constructor(
        id: string = "",
        linkedUOMName: string = "",
        _lengthValue: number = 0,
        _widthValue: number = 0,
        _heightValue: number = 0,
        _volumeValue: number = 0,
        weightKg: number = 0,
        conversionFrom: string = "",
        conversionTo: string = "",
        conversionQTY: number = 0
    ) {
        this.id = id;
        this.linkedUOMName = linkedUOMName;
        this._lengthValue = _lengthValue;
        this._widthValue = _widthValue;
        this._heightValue = _heightValue;
        this._volumeValue =
            (_heightValue * _widthValue * _lengthValue) / 1000000;
        this.weightKg = weightKg;
        this.conversionFrom = conversionFrom;
        this.conversionTo = conversionTo;
        this.conversionQTY = conversionQTY;
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
            (this._widthValue * this._heightValue * this._lengthValue) /
            1000000;
    }
}
