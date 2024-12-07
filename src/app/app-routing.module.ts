import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth-guard.service";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WarehoustListComponent } from "./components/warehoust-list/warehoust-list.component";
import { UomListComponent } from "./components/uom-list/uom-list.component";
import { CreateNewUomComponent } from "./components/create-new-uom/create-new-uom.component";
import { UomDetailsComponent } from "./components/uom-details/uom-details.component";
import { CountriesListComponent } from "./components/countries-list/countries-list.component";
import { PagenotfoundComponent } from "./pages/pagenotfound/pagenotfound.component";
import { AddNewCustomerComponent } from "./components/add-new-customer/add-new-customer.component";
import { environment } from "../environments/environment";
import { PaymentTypesComponent } from "./components/payment-types/payment-types.component";
import { SalesTaxesComponent } from "./components/sales-taxes/sales-taxes.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: environment.enableAuthGuard ? [AuthGuard] : undefined,
        children: [
            {
                path: "",
                component: DashboardComponent,
            },
            {
                path: "warehouse-list",
                component: WarehoustListComponent,
            },
            {
                path: "uom-list",
                component: UomListComponent,
            },
            {
                path: "create-new-uom",
                component: CreateNewUomComponent,
            },
            {
                path: "uom-details",
                component: UomDetailsComponent,
            },
            {
                path: "uom-details/:UOMId",
                component: UomDetailsComponent,
            },
            {
                path: "countries-list",
                component: CountriesListComponent,
            },
            {
                path: "add-new-customer",
                component: AddNewCustomerComponent,
            },
            {
                path: "payment-types",
                component: PaymentTypesComponent,
            },
            {
                path: "sales-taxes",
                component: SalesTaxesComponent,
            },
        ],
    },
    { path: "login", component: LoginComponent },
    { path: "**", component: PagenotfoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
