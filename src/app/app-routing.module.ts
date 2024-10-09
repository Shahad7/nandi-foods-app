import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth-guard.service";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WarehoustListComponent } from "./components/warehoust-list/warehoust-list.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "",
                component: DashboardComponent,
                data: { title: "Dashboard" },
            },
            {
                path: "warehouse-list",
                component: WarehoustListComponent,
                data: { title: "Warehouse List" },
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
