import { Component, ViewChild, viewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent {
    @ViewChild("sidebar")
    sidebar: any;
    selectedOption!: string;

    sidebarItems = [
        {
            mainTitle: "Inventory Management",
            subMenus: [
                {
                    subTitle: "Warehouses",
                    hasOptions: true,
                    options: [
                        { name: "Warehouse List", route: "warehouse-list" },
                        {
                            name: "Create New Warehouse",
                            route: "create-new-warehouse",
                        },
                        {
                            name: "Warehouse Details",
                            route: "warehouse-details",
                        },
                    ],
                },
                {
                    subTitle: "Products",
                    hasOptions: true,
                    options: [
                        { name: "Products List", route: "products-list" },
                        {
                            name: "Create New Product",
                            route: "create-new-product",
                        },
                        { name: "Product Details", route: "product-details" },
                        { name: "Price List", route: "price-list" },
                        {
                            name: "Add New Price List",
                            route: "add-new-price-list",
                        },
                    ],
                },
            ],
        },
        {
            mainTitle: "Inventory Processing",
            subMenus: [
                {
                    subTitle: "Goods Received Notes (GRN)",
                    hasOptions: true,
                    options: [
                        { name: "GRN List", route: "grn-list" },
                        { name: "Create New GRN", route: "create-new-grn" },
                        { name: "GRN Details", route: "grn-details" },
                    ],
                },
                {
                    subTitle: "Goods Transfer Notes (GTN)",
                    hasOptions: true,
                    options: [
                        { name: "GTN List", route: "gtn-list" },
                        { name: "Create New GTN", route: "create-new-gtn" },
                        { name: "GTN Details", route: "gtn-details" },
                    ],
                },
                {
                    subTitle: "Damaged Goods Note (DGN)",
                    hasOptions: true,
                    options: [
                        { name: "DGN List", route: "dgn-list" },
                        { name: "Create New DGN", route: "create-new-dgn" },
                        { name: "DGN Details", route: "dgn-details" },
                    ],
                },
                {
                    subTitle: "Production Orders (PRD)",
                    hasOptions: true,
                    options: [
                        { name: "PRD List", route: "prd-list" },
                        {
                            name: "Create New PRD Order",
                            route: "create-new-prd-order",
                        },
                        { name: "PRD Details", route: "prd-details" },
                    ],
                },
                {
                    subTitle: "Order Fulfillment",
                    hasOptions: true,
                    options: [
                        { name: "Order Picking", route: "order-picking" },
                        { name: "Order Packing", route: "order-packing" },
                        { name: "Order Shipping", route: "order-shipping" },
                    ],
                },
            ],
        },
        {
            mainTitle: "Employees",
            subMenus: [
                {
                    subTitle: "Employee List",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Add New Employee",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Employee Details",
                    hasOptions: false,
                    options: [],
                },
            ],
        },
        {
            mainTitle: "Timesheets",
            subMenus: [
                {
                    subTitle: "Timesheets List",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Add New Timesheets",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Timesheets Details",
                    hasOptions: false,
                    options: [],
                },
            ],
        },
        {
            mainTitle: "Sales Invoices Processing",
            subMenus: [
                {
                    subTitle: "Sales Invoices",
                    hasOptions: true,
                    options: [
                        {
                            name: "Sales Invoice List",
                            route: "sales-invoice-list",
                        },
                        {
                            name: "Create New Invoice",
                            route: "create-new-invoice",
                        },
                        { name: "Invoice Details", route: "invoice-details" },
                    ],
                },
                {
                    subTitle: "Receipts",
                    hasOptions: true,
                    options: [
                        { name: "Receipts List", route: "receipts-list" },
                        {
                            name: "Create New Receipt",
                            route: "create-new-receipt",
                        },
                        { name: "Receipt Details", route: "receipt-details" },
                    ],
                },
                {
                    subTitle: "Credit Notes",
                    hasOptions: true,
                    options: [
                        {
                            name: "Credit Notes List",
                            route: "credit-notes-list",
                        },
                        {
                            name: "Create New Credit Note",
                            route: "create-new-credit-note",
                        },
                        {
                            name: "Credit Note Details",
                            route: "credit-note-details",
                        },
                    ],
                },
            ],
        },
        {
            mainTitle: "Settings",
            subMenus: [
                {
                    subTitle: "General Settings",
                    hasOptions: true,
                    options: [
                        { name: "Countries List", route: "countries-list" },
                        { name: "States List", route: "states-list" },
                        { name: "Cities List", route: "cities-list" },
                        { name: "Currencies", route: "currencies" },
                        { name: "Sales Taxes", route: "sales-taxes" },
                        { name: "Payment Types", route: "payment-types" },
                        { name: "Payment Terms", route: "payment-terms" },
                        { name: "General UOM", route: "general-uom" },
                    ],
                },
                {
                    subTitle: "Warehouse Settings",
                    hasOptions: true,
                    options: [
                        {
                            name: "Warehouse No. Settings",
                            route: "warehouse-no-settings",
                        },
                        {
                            name: "Facility Certifications",
                            route: "facility-certifications",
                        },
                    ],
                },
                {
                    subTitle: "Products Settings",
                    hasOptions: true,
                    options: [
                        { name: "Product Sizes", route: "product-sizes" },
                        { name: "Product UOM", route: "product-uom" },
                        {
                            name: "Product Certifications",
                            route: "product-certifications",
                        },
                    ],
                },
                {
                    subTitle: "Employee Settings",
                    hasOptions: true,
                    options: [
                        {
                            name: "Employee No. Settings",
                            route: "employee-no-settings",
                        },
                        {
                            name: "Employee Positions",
                            route: "employee-positions",
                        },
                        {
                            name: "Permits and Certificates",
                            route: "permits-and-certificates",
                        },
                    ],
                },
            ],
        },
    ];

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private httpClient: HttpClient
    ) {
        this.route.firstChild?.data.subscribe((data) => {
            this.selectedOption = data["title"];
        });

        this.router.events.subscribe()
    }

    toggleSidebar() {
        this.sidebar.nativeElement.style.display =
            this.sidebar.nativeElement.style.display == "block"
                ? "none"
                : "block";
    }

    onLogout() {
        this.authService.logout();
    }

    OnRefresh() {
        //to-do refetch latest data from server
        //should communicate with current child component to update its data
    }

    goToNested(url: string, name: string) {
        this.selectedOption = name;
        this.router.navigate([url]);
    }
}
