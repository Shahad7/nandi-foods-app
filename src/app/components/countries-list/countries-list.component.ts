import { Component, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { TableHeader, TableKey, TableRow } from "../../types/table-types";

@Component({
    selector: "app-countries-list",
    templateUrl: "./countries-list.component.html",
    styleUrl: "./countries-list.component.css",
})
export class CountriesListComponent {
    @ViewChild("fileInput")
    fileInput: any;
    searchValue: string = "";

    loading: boolean = false;
    error: boolean = false;
    headers: TableHeader[] = [
        { name: "Continent", minWidth: "104px" },
        { name: "Continental Region", minWidth: "104px" },
        { name: "Country", minWidth: "104px" },
        { name: "Province/State", minWidth: "104px" },
        { name: "City/Town", minWidth: "104px" },
    ];

    keys: TableKey[] = [
        { name: "continent" },
        { name: "continentalRegion" },
        { name: "country" },
        { name: "provinceOrState" },
        { name: "cityOrTown" },
    ];

    rows: TableRow[] = [
        {
            continent: "North America",
            continentalRegion: "Northern",
            country: "USA",
            provinceOrState: "California",
            cityOrTown: "Los Angeles",
        },
        {
            continent: "Europe",
            continentalRegion: "Western",
            country: "Germany",
            provinceOrState: "Bavaria",
            cityOrTown: "Munich",
        },
        {
            continent: "Asia",
            continentalRegion: "Eastern",
            country: "China",
            provinceOrState: "Guangdong",
            cityOrTown: "Shenzhen",
        },
        {
            continent: "Africa",
            continentalRegion: "Northern",
            country: "Egypt",
            provinceOrState: "Cairo Governorate",
            cityOrTown: "Cairo",
        },
        {
            continent: "South America",
            continentalRegion: "Southern",
            country: "Brazil",
            provinceOrState: "São Paulo",
            cityOrTown: "São Paulo",
        },
        {
            continent: "Australia",
            continentalRegion: "Oceania",
            country: "Australia",
            provinceOrState: "New South Wales",
            cityOrTown: "Sydney",
        },
        {
            continent: "Europe",
            continentalRegion: "Southern",
            country: "Italy",
            provinceOrState: "Lazio",
            cityOrTown: "Rome",
        },
        {
            continent: "North America",
            continentalRegion: "Northern",
            country: "Canada",
            provinceOrState: "Ontario",
            cityOrTown: "Toronto",
        },
        {
            continent: "Asia",
            continentalRegion: "Southern",
            country: "India",
            provinceOrState: "Maharashtra",
            cityOrTown: "Mumbai",
        },
        {
            continent: "Africa",
            continentalRegion: "Southern",
            country: "South Africa",
            provinceOrState: "Gauteng",
            cityOrTown: "Johannesburg",
        },
        {
            continent: "Europe",
            continentalRegion: "Northern",
            country: "Norway",
            provinceOrState: "Oslo",
            cityOrTown: "Oslo",
        },
        {
            continent: "Asia",
            continentalRegion: "Southeast",
            country: "Thailand",
            provinceOrState: "Bangkok",
            cityOrTown: "Bangkok",
        },
        {
            continent: "South America",
            continentalRegion: "Northern",
            country: "Colombia",
            provinceOrState: "Bogotá",
            cityOrTown: "Bogotá",
        },
        {
            continent: "North America",
            continentalRegion: "Caribbean",
            country: "Cuba",
            provinceOrState: "Havana",
            cityOrTown: "Havana",
        },
        {
            continent: "Europe",
            continentalRegion: "Eastern",
            country: "Poland",
            provinceOrState: "Masovian",
            cityOrTown: "Warsaw",
        },
        {
            continent: "Asia",
            continentalRegion: "Western",
            country: "Saudi Arabia",
            provinceOrState: "Riyadh Province",
            cityOrTown: "Riyadh",
        },
        {
            continent: "Africa",
            continentalRegion: "Eastern",
            country: "Kenya",
            provinceOrState: "Nairobi",
            cityOrTown: "Nairobi",
        },
        {
            continent: "South America",
            continentalRegion: "Andean",
            country: "Peru",
            provinceOrState: "Lima",
            cityOrTown: "Lima",
        },
        {
            continent: "Australia",
            continentalRegion: "Oceania",
            country: "New Zealand",
            provinceOrState: "Auckland",
            cityOrTown: "Auckland",
        },
        {
            continent: "Europe",
            continentalRegion: "Western",
            country: "France",
            provinceOrState: "Île-de-France",
            cityOrTown: "Paris",
        },
        {
            continent: "North America",
            continentalRegion: "Central",
            country: "Mexico",
            provinceOrState: "Mexico City",
            cityOrTown: "Mexico City",
        },
        {
            continent: "Asia",
            continentalRegion: "Central",
            country: "Kazakhstan",
            provinceOrState: "Almaty",
            cityOrTown: "Almaty",
        },
        {
            continent: "Africa",
            continentalRegion: "Western",
            country: "Nigeria",
            provinceOrState: "Lagos",
            cityOrTown: "Lagos",
        },
        {
            continent: "South America",
            continentalRegion: "Southern",
            country: "Argentina",
            provinceOrState: "Buenos Aires",
            cityOrTown: "Buenos Aires",
        },
        {
            continent: "Europe",
            continentalRegion: "Northern",
            country: "Sweden",
            provinceOrState: "Stockholm",
            cityOrTown: "Stockholm",
        },
        {
            continent: "Asia",
            continentalRegion: "Eastern",
            country: "Japan",
            provinceOrState: "Tokyo",
            cityOrTown: "Tokyo",
        },
        {
            continent: "Africa",
            continentalRegion: "Central",
            country: "Democratic Republic of the Congo",
            provinceOrState: "Kinshasa",
            cityOrTown: "Kinshasa",
        },
        {
            continent: "Europe",
            continentalRegion: "Western",
            country: "United Kingdom",
            provinceOrState: "England",
            cityOrTown: "London",
        },
        {
            continent: "Asia",
            continentalRegion: "Southern",
            country: "Pakistan",
            provinceOrState: "Sindh",
            cityOrTown: "Karachi",
        },
        {
            continent: "North America",
            continentalRegion: "Central",
            country: "Panama",
            provinceOrState: "Panamá",
            cityOrTown: "Panama City",
        },
    ];

    //temporary default paginator props
    paginatorProps = {
        length: 100,
        pageSize: 50,
        pageIndex: 0,
        pageSizeOptions: [10, 20, 30, 40, 50],
        hidePageSize: false,
        showPageSizeOptions: true,
        showFirstLastButtons: true,
        disabled: false,
    };

    handlePageEvent(e: PageEvent) {
        this.paginatorProps.length = e.length;
        this.paginatorProps.pageSize = e.pageSize;
        this.paginatorProps.pageIndex = e.pageIndex;
    }

    constructor() {}

    search() {}

    triggerFileInput() {
        this.fileInput.nativeElement.click();
    }
    uploadFile(event: any) {
        console.log(event.target?.files[0].name);
    }
}
