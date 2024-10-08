import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Ui5WebcomponentsModule } from "@ui5/webcomponents-ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { NgApexchartsModule } from "ng-apexcharts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { environment } from "./../environments/environment";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WarehoustListComponent } from "./components/warehoust-list/warehoust-list.component";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: environment.keycloakServerUrl!,
                realm: environment.realm!,
                clientId: environment.clientId!,
            },
            initOptions: {
                onLoad: "check-sso",
                silentCheckSsoRedirectUri:
                    window.location.origin + "/assets/silent-check-sso.html",
            },
            //decide whether Bearer token should be added to every route or allow exceptions
            shouldAddToken: (request) => {
                const { method, url } = request;

                const isGetRequest = "GET" === method.toUpperCase();
                const acceptablePaths = ["/assets"];
                const isAcceptablePathMatch = acceptablePaths.some((path) =>
                    url.includes(path)
                );

                return !(isGetRequest && isAcceptablePathMatch);
            },
        });
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DashboardComponent,
        WarehoustListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        Ui5WebcomponentsModule,
        BrowserAnimationsModule,
        KeycloakAngularModule,
        NgApexchartsModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
        provideHttpClient(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
