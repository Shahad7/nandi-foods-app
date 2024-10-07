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
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
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
