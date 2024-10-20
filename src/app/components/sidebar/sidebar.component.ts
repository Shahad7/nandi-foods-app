import { Subscription } from "rxjs";
import { MainCommunicationService } from "./../../services/main-communication.service";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
    ActivatedRoute,
    NavigationEnd,
    NavigationStart,
    Router,
    Scroll,
} from "@angular/router";
import { LocationStrategy } from "@angular/common";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrl: "./sidebar.component.css",
})
export class SidebarComponent implements OnDestroy, OnInit {
    @ViewChild("sidebar")
    sidebar: any;
    //subscriptions to cancel on destruction
    toggleSidebarSubscription!: Subscription | undefined;
    routeSubscription!: Subscription | undefined;

    //sideNav
    selectedOption!: string;
    selectedSubtitle = "";
    selectedMainTitle = "";
    //title lookup
    titleLookupTable = {
        "": "Dashboard",
        "warehouse-list": "Warehouse List",
        "create-new-warehouse": "Create New Warehouse",
        "warehouse-details": "Warehouse Details",
        "products-list": "Products List",
        "create-new-product": "Create New Product",
        "product-details": "Product Details",
        "price-list": "Price List",
        "add-new-price-list": "Add New Price List",
        "grn-list": "GRN List",
        "create-new-grn": "Create New GRN",
        "grn-details": "GRN Details",
        "gtn-list": "GTN List",
        "create-new-gtn": "Create New GTN",
        "gtn-details": "GTN Details",
        "dgn-list": "DGN List",
        "create-new-dgn": "Create New DGN",
        "dgn-details": "DGN Details",
        "prd-list": "PRD List",
        "create-new-prd-order": "Create New PRD Order",
        "prd-details": "PRD Details",
        "order-picking": "Order Picking",
        "order-packing": "Order Packing",
        "order-shipping": "Order Shipping",
        "sales-invoice-list": "Sales Invoice List",
        "create-new-invoice": "Create New Invoice",
        "invoice-details": "Invoice Details",
        "receipts-list": "Receipts List",
        "create-new-receipt": "Create New Receipt",
        "receipt-details": "Receipt Details",
        "credit-notes-list": "Credit Notes List",
        "create-new-credit-note": "Create New Credit Note",
        "credit-note-details": "Credit Note Details",
        "countries-list": "Countries List",
        "states-list": "States List",
        "cities-list": "Cities List",
        currencies: "Currencies",
        "sales-taxes": "Sales Taxes",
        "payment-types": "Payment Types",
        "payment-terms": "Payment Terms",
        "general-uom": "UOM",
        "uom-list": "UOM List",
        "create-new-uom": "Create New UOM",
        "uom-details": "UOM Details",
        "warehouse-no-settings": "Warehouse No. Settings",
        "facility-certifications": "Facility Certifications",
        "product-sizes": "Product Sizes",
        "product-uom": "Product UOM",
        "product-certifications": "Product Certifications",
        "employee-no-settings": "Employee No. Settings",
        "employee-positions": "Employee Positions",
        "permits-and-certificates": "Permits and Certificates",
    } as any;

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
            mainTitle: "General Settings",
            subMenus: [
                {
                    subTitle: "Countries List",
                    route: "countries-list",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "States List",
                    route: "states-list",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Cities List",
                    route: "cities-list",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Currencies",
                    route: "currencies",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Sales Taxes",
                    route: "sales-taxes",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Payment Types",
                    route: "payment-types",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Payment Terms",
                    route: "payment-terms",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "UOM",
                    route: "general-uom",
                    hasOptions: true,
                    options: [
                        { name: "UOM List", route: "uom-list" },
                        { name: "Create New UOM", route: "create-new-uom" },
                        { name: "UOM Details", route: "uom-details" },
                    ],
                },
            ],
        },
        {
            mainTitle: "Warehouse Settings",
            subMenus: [
                {
                    subTitle: "Warehouse No. Settings",
                    route: "warehouse-no-settings",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Facility Certifications",
                    route: "facility-certifications",
                    hasOptions: false,
                    options: [],
                },
            ],
        },
        {
            mainTitle: "Products Settings",
            subMenus: [
                {
                    subTitle: "Product Sizes",
                    route: "product-sizes",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Product UOM",
                    route: "product-uom",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Product Certifications",
                    route: "product-certifications",
                    hasOptions: false,
                    options: [],
                },
            ],
        },
        {
            mainTitle: "Employee Settings",
            subMenus: [
                {
                    subTitle: "Employee No. Settings",
                    route: "employee-no-settings",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Employee Positions",
                    route: "employee-positions",
                    hasOptions: false,
                    options: [],
                },
                {
                    subTitle: "Permits and Certificates",
                    route: "permits-and-certificates",
                    hasOptions: false,
                    options: [],
                },
            ],
        },
    ];

    constructor(
        private mainCommunicationService: MainCommunicationService,
        private router: Router,
        private route: ActivatedRoute,
        private location: LocationStrategy
    ) {}
    ngOnInit(): void {
        //listen for route changes to detect child component title that is side navigation change

        this.routeSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd || event instanceof Scroll) {
                let path = this.route.snapshot.firstChild?.url[0]?.path;
                path = path == undefined ? "" : path;
                this.selectedOption = this.titleLookupTable[path as any];
                for (let item of this.sidebarItems) {
                    let found = false;
                    for (let subitem of item.subMenus) {
                        if (subitem.hasOptions) {
                            for (let option of subitem.options) {
                                if (option.name == this.selectedOption) {
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if (found) {
                            this.selectedSubtitle = subitem.subTitle;
                            break;
                        }
                    }
                    if (found) {
                        this.selectedMainTitle = item.mainTitle;
                        break;
                    }
                }
            }
        });

        //listen for sidebar toggling from subheader on low screen width devices
        this.toggleSidebarSubscription =
            this.mainCommunicationService.toggleSidebar$.subscribe((data) => {
                this.toggleSidebar();
            });

        //listen to back and forth navigations using browser
        this.location.onPopState(() => {
            let url = this.location.path().substring(1);
            this.goToNested(url);
        });
    }

    toggleSidebar() {
        this.sidebar.nativeElement.style.display =
            this.sidebar.nativeElement.style.display == "block"
                ? "none"
                : "block";
    }

    goToNested(url: string) {
        let path = url.split("/")[0];
        this.selectedOption = this.titleLookupTable[path];
        this.router.navigate([url]);
    }

    ngOnDestroy(): void {
        this.toggleSidebarSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
    }

    manualExpand(event: any, node: any) {
        console.log(event.target.localName);
        if (event.target.localName == "ui5-side-navigation-item") {
            console.log(node);
            node.expanded = !node.expanded;
        }
    }
}
