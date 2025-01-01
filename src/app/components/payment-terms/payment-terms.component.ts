import { Component } from "@angular/core";

@Component({
    selector: "app-payment-terms",
    templateUrl: "./payment-terms.component.html",
    styleUrl: "./payment-terms.component.css",
})
export class PaymentTermsComponent {
    headers = [
        { name: "Payment" },
        { name: "Payment Terms Name" },
        { name: "Number of days from" },
    ];
    keys = [{ name: "payment" }, { name: "name" }, { name: "daysFrom" }];

    rows = [
        { payment: "PTEM01", name: "Due Upon Receipt", daysFrom: "0 DAYS" },
        { payment: "PTEM02", name: "5 DAYS", daysFrom: "5 DAYS" },
        { payment: "PTEM03", name: "7 DAYS", daysFrom: "7 DAYS" },
        { payment: "PTEM04", name: "10 DAYS", daysFrom: "10 DAYS" },
        { payment: "PTEM05", name: "14 DAYS", daysFrom: "14 DAYS" },
        { payment: "PTEM06", name: "21 DAYS", daysFrom: "21 DAYS" },
        { payment: "PTEM07", name: "30 DAYS", daysFrom: "30 DAYS" },
    ];
}
