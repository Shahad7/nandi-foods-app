export class LinkedUOM {
    id: string;
    quantity: number;

    constructor(id: string = "", quantity: number = 0) {
        this.id = id;
        this.quantity = quantity;
    }
}
