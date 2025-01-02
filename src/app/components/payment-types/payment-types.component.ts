import { Component } from "@angular/core";
import { TableHeader, TableKey, TableRow } from "../../types/table-types";

@Component({
    selector: "app-payment-types",
    templateUrl: "./payment-types.component.html",
    styleUrl: "./payment-types.component.css",
})
export class PaymentTypesComponent {
    headers: TableHeader[] = [
        { name: "Payment Type" },
        { name: "Payment Type Name" },
    ];
    keys: TableKey[] = [{ name: "type" }, { name: "name" }];
    rows: TableRow[] = [
        { type: "PYT001", name: "Cash" },
        { type: "PYT002", name: "Direct Bank Deposit" },
        { type: "PYT003", name: "Cheque" },
        { type: "PYT004", name: "Stripe - Credit Card" },
        { type: "PYT005", name: "Stripe - ACH" },
        { type: "PYT006", name: "Stripe - Moto Process n Wait" },
    ];
}
