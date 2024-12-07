export class Warehouse {
    warehouseNo: string;
    warehouseName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
    mobile: string;
    warehouseContact: string;
    facilityCert1: string;
    facilityCert2: string;
    facilityCert3: string;
    capacityLB: number;
    capacityKG: number;
    status: string;
    lastUpdated: string;
    lastUpdatedBy: string;

    constructor(
        warehouseNo: string = "",
        warehouseName: string = "",
        address1: string = "",
        address2: string = "",
        city: string = "",
        state: string = "",
        postalCode: string = "",
        country: string = "",
        email: string = "",
        phone: string = "",
        mobile: string = "",
        warehouseContact: string = "",
        facilityCert1: string = "",
        facilityCert2: string = "",
        facilityCert3: string = "",
        capacityLB: number = 0,
        capacityKG: number = 0,
        status: string = "",
        lastUpdated: string = "",
        lastUpdatedBy: string = ""
    ) {
        this.warehouseNo = warehouseNo;
        this.warehouseName = warehouseName;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
        this.email = email;
        this.phone = phone;
        this.mobile = mobile;
        this.warehouseContact = warehouseContact;
        this.facilityCert1 = facilityCert1;
        this.facilityCert2 = facilityCert2;
        this.facilityCert3 = facilityCert3;
        this.capacityLB = capacityLB;
        this.capacityKG = capacityKG;
        this.status = status;
        this.lastUpdated = lastUpdated;
        this.lastUpdatedBy = lastUpdatedBy;
    }
}
