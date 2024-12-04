export class Customer {
    customerNo: string;
    customerLegalName: string;
    customerTradeName: string;

    address1: string;
    address2: string;
    city: string;
    stateProvince: string;
    zipPostalCode: string;
    country: string;

    email: string;
    phone: string;
    mobile: string;

    firstName: string;
    middleName: string;
    lastName: string;
    position: string;

    customerCategory: string;
    accountManager: string;
    salesRep: string;
    status: string;

    constructor(
        customerNo: string = "",
        customerLegalName: string = "",
        customerTradeName: string = "",
        address1: string = "",
        address2: string = "",
        city: string = "",
        stateProvince: string = "",
        zipPostalCode: string = "",
        country: string = "",
        email: string = "",
        phone: string = "",
        mobile: string = "",
        firstName: string = "",
        middleName: string = "",
        lastName: string = "",
        position: string = "",
        customerCategory: string = "",
        accountManager: string = "",
        salesRep: string = "",
        status: string = "ACTIVE"
    ) {
        this.customerNo = customerNo;
        this.customerLegalName = customerLegalName;
        this.customerTradeName = customerTradeName;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.stateProvince = stateProvince;
        this.zipPostalCode = zipPostalCode;
        this.country = country;
        this.email = email;
        this.phone = phone;
        this.mobile = mobile;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.position = position;
        this.customerCategory = customerCategory;
        this.accountManager = accountManager;
        this.salesRep = salesRep;
        this.status = status;
    }
}
