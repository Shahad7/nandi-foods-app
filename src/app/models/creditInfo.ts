export class CreditInfo {
    creditTerms: string;
    creditLimit: string;
    creditStatus: string;
    totalUnpaidInvoices: string;
    availableCredit: string;

    constructor(
        creditTerms: string = "",
        creditLimit: string = "",
        creditStatus: string = "",
        totalUnpaidInvoices: string = "",
        availableCredit: string = ""
    ) {
        this.creditTerms = creditTerms;
        this.creditLimit = creditLimit;
        this.creditStatus = creditStatus;
        this.totalUnpaidInvoices = totalUnpaidInvoices;
        this.availableCredit = availableCredit;
    }
}
