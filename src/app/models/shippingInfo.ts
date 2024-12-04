export class ShippingInfo {
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
    mobile: string;
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;

    constructor(
        address1: string = "",
        address2: string = "",
        city: string = "",
        state: string = "",
        postalCode: string = "",
        country: string = "",
        email: string = "",
        phone: string = "",
        mobile: string = "",
        firstName: string = "",
        middleName: string = "",
        lastName: string = "",
        position: string = ""
    ) {
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
        this.email = email;
        this.phone = phone;
        this.mobile = mobile;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.position = position;
    }
}
