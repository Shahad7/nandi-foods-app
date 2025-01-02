import { Component } from "@angular/core";
import { TableHeader, TableKey, TableRow } from "../../types/table-types";

@Component({
    selector: "app-currencies-list",
    templateUrl: "./currencies-list.component.html",
    styleUrl: "./currencies-list.component.css",
})
export class CurrenciesListComponent {
    keys: TableKey[] = [
        { name: "country" },
        { name: "countryDomainCode" },
        { name: "currencyCode" },
        { name: "countryPhoneCode" },
    ];

    headers: TableHeader[] = [
        { name: "Country", minWidth: undefined },
        { name: "Country Domain Code", minWidth: undefined },
        { name: "Currency Code", minWidth: undefined },
        { name: "Country Phone Code", minWidth: undefined },
    ];
    rows: TableRow[] = [
        {
            country: "Canada",
            countryDomainCode: "CA",
            currencyCode: "CAD",
            countryPhoneCode: "+1",
        },
        {
            country: "South Africa",
            countryDomainCode: "ZA",
            currencyCode: "ZAR",
            countryPhoneCode: "+27",
        },
        {
            country: "USA",
            countryDomainCode: "US",
            currencyCode: "USD",
            countryPhoneCode: "+1",
        },
        {
            country: "United Kingdom",
            countryDomainCode: "UK",
            currencyCode: "GBP",
            countryPhoneCode: "+44",
        },
        {
            country: "Australia",
            countryDomainCode: "AU",
            currencyCode: "AUD",
            countryPhoneCode: "+61",
        },
        {
            country: "India",
            countryDomainCode: "IN",
            currencyCode: "INR",
            countryPhoneCode: "+91",
        },
        {
            country: "Germany",
            countryDomainCode: "DE",
            currencyCode: "EUR",
            countryPhoneCode: "+49",
        },
        {
            country: "Japan",
            countryDomainCode: "JP",
            currencyCode: "JPY",
            countryPhoneCode: "+81",
        },
    ];
}
