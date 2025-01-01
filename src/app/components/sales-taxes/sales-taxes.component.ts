import { Component } from "@angular/core";

@Component({
    selector: "app-sales-taxes",
    templateUrl: "./sales-taxes.component.html",
    styleUrl: "./sales-taxes.component.css",
})
export class SalesTaxesComponent {
    headers = [
        { name: "Sales Tax Code" },
        { name: "Sales Tax Name" },
        { name: "Sales Tax Rate" },
        { name: "Country" },
        { name: "State" },
    ];

    keys = [
        { name: "taxCode" },
        { name: "taxName" },
        { name: "taxRate" },
        { name: "country" },
        { name: "state" },
    ];

    rows = [
        {
            taxCode: "STX01",
            taxName: "GST 5%",
            taxRate: "5%",
            country: "CANADA",
            state: "Alberta",
        },
        {
            taxCode: "STX02",
            taxName: "PST 7%",
            taxRate: "7%",
            country: "CANADA",
            state: "British Columbia",
        },
        {
            taxCode: "STX03",
            taxName: "HST 13%",
            taxRate: "13%",
            country: "CANADA",
            state: "Ontario",
        },
        {
            taxCode: "STX04",
            taxName: "QST 9.975%",
            taxRate: "9.975%",
            country: "CANADA",
            state: "Quebec",
        },
        {
            taxCode: "STX05",
            taxName: "Sales Tax 8.25%",
            taxRate: "8.25%",
            country: "USA",
            state: "Texas",
        },
        {
            taxCode: "STX06",
            taxName: "Sales Tax 7%",
            taxRate: "7.00%",
            country: "USA",
            state: "Indiana",
        },
        {
            taxCode: "STX07",
            taxName: "Sales Tax 9.5%",
            taxRate: "9.50%",
            country: "USA",
            state: "California",
        },
    ];
}
