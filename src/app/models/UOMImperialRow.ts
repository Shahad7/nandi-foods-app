export class UOMImperialRow {
    _lengthIn: number;
    _widthIn: number;
    _heightIn: number;
    _volumeFt3: number;
    weightLb: number;

    constructor(
        _lengthIn: number = 0,
        _widthIn: number = 0,
        _heightIn: number = 0,
        _volumeFt3: number = 0,
        weightLb: number = 0
    ) {
        this._lengthIn = _lengthIn;
        this._widthIn = _widthIn;
        this._heightIn = _heightIn;
        this._volumeFt3 = (_lengthIn * _widthIn * _heightIn) / 1728;
        this.weightLb = weightLb;
    }

    get volumeFt3() {
        return this._volumeFt3;
    }

    get widthIn() {
        return this._widthIn;
    }

    get heightIn() {
        return this._heightIn;
    }

    get lengthIn() {
        return this._lengthIn;
    }

    set widthIn(value: number) {
        this._widthIn = value;
        this.updateVolume();
    }

    set heightIn(value: number) {
        this._heightIn = value;
        this.updateVolume();
    }

    set lengthIn(value: number) {
        this._lengthIn = value;
        this.updateVolume();
    }

    updateVolume() {
        this._volumeFt3 =
            (this._widthIn * this._heightIn * this._lengthIn) / 1728;
    }
}
