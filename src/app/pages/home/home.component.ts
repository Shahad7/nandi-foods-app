import { MainCommunicationService } from "./../../services/main-communication.service";
import {
    Component,
    NgZone,
    OnDestroy,
    Renderer2,
    ViewChild,
    viewChild,
} from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent implements OnDestroy {
    @ViewChild("sidebar")
    sidebar: any;
    @ViewChild("time")
    timeNode: any;

    //subscriptions to cancel on destruction
    toggleSidebarSubscription!: Subscription | undefined;
    routeSubscription!: Subscription | undefined;

    profileName: string = "John Doe";
    selectedOption!: string;
    selectedOptionToDisplay!: string;
    selectedSubtitle = "";
    selectedMainTitle = "";
    currentDateAndTime: any;
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
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private httpClient: HttpClient,
        private datePipe: DatePipe,
        private zone: NgZone,
        private renderer: Renderer2,
        private mainCommunicationService: MainCommunicationService
    ) {
        this.currentDateAndTime = this.datePipe.transform(
            new Date(),
            "MMM d, y, h:mm:ss a"
        );
        this.zone.runOutsideAngular(() => {
            setInterval(() => {
                this.renderer.setProperty(
                    this.timeNode.nativeElement,
                    "textContent",
                    this.datePipe.transform(new Date(), "MMM d, y, h:mm:ss a")
                );
            }, 1);
        });

        //listen for route changes to detect child component title that is side navigation change
        this.routeSubscription = this.route.firstChild?.data.subscribe(
            (data) => {
                this.selectedOption = data["title"];
                this.selectedOptionToDisplay = this.selectedOption;
                this.mainCommunicationService.alertTitleChange(
                    this.selectedOptionToDisplay
                );
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
        );

        //listen for sidebar toggling from subheader on low screen width devices
        this.toggleSidebarSubscription =
            this.mainCommunicationService.toggleSidebar$.subscribe((data) => {
                this.toggleSidebar();
            });
    }
    ngOnDestroy(): void {
        this.toggleSidebarSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
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

    goToNested(url: string, name: string) {
        this.selectedOption = name;
        this.selectedOptionToDisplay = name;
        this.mainCommunicationService.alertTitleChange(
            this.selectedOptionToDisplay
        );

        this.router.navigate([url]);
    }
}
