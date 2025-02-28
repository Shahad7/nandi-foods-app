export class LinkedUOM {
    id: string;
    quantity: number;
    fromId: string;

    constructor(id: string = "", quantity: number = 0, fromId: string = "") {
        this.id = id;
        this.quantity = quantity;
        this.fromId = fromId;
    }
}
