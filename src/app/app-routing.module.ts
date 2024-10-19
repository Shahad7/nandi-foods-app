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

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
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
        ],
    },
    { path: "login", component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
