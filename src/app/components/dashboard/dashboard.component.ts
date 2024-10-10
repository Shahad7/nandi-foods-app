import { Component } from "@angular/core";

export type ChartOptions = {
    series: any;
    chart: any;
    plotOptions: any;
    dataLabels: any;
    xaxis: any;
    colors: any;
    grid: any; // Include grid in type
};

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
    barGraphCategories = [
        "Inventory Value by Category",
        "Warehouse Capacity",
        "Sales by Category",
        "Sales by Warehouse",
    ];

    tableCategories = ["Top 10 Products by Sale", "Top 10 Customers by Sale"];
    public chartOptions: Partial<ChartOptions>;
    constructor() {
        this.chartOptions = {
            series: [
                {
                    data: [2.12, 2.33, 4.5],
                },
            ],
            chart: {
                type: "bar",
                width: 400,
                height: 350,
                redrawOnWindowResize: true,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    barHeight: "50%",
                },
            },
            dataLabels: {},
            colors: ["#f4b400", "#00c853", "#00c853"],
            grid: {
                show: false,
            },
        };
    }
}
