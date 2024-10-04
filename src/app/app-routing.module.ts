import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
    { path: "", component: HomeComponent, canActivate: [authGuard] },
    { path: "login", component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
