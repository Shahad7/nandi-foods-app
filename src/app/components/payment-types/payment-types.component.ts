import { Component } from "@angular/core";

@Component({
    selector: "app-payment-types",
    templateUrl: "./payment-types.component.html",
    styleUrl: "./payment-types.component.css",
})
export class PaymentTypesComponent {
    headers = [{ name: "Payment Type" }, { name: "Payment Type Name" }];
    keys = ["type", "name"];
    rows = [
        { type: "PYT001", name: "Cash" },
        { type: "PYT002", name: "Direct Bank Deposit" },
        { type: "PYT003", name: "Cheque" },
        { type: "PYT004", name: "Stripe - Credit Card" },
        { type: "PYT005", name: "Stripe - ACH" },
        { type: "PYT006", name: "Stripe - Moto Process n Wait" },
    ];
}
