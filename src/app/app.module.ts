import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatInputModule } from "@angular/material/input";
import { Ui5WebcomponentsModule } from "@ui5/webcomponents-ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatPaginatorModule } from "@angular/material/paginator";

import {
    KeycloakAngularModule,
    KeycloakEventType,
    KeycloakService,
} from "keycloak-angular";
import { NgApexchartsModule } from "ng-apexcharts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { SnackbarComponent } from "./components/shared/snackbar/snackbar.component";
import { environment } from "./../environments/environment";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WarehoustListComponent } from "./components/warehoust-list/warehoust-list.component";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { CommonModule, DatePipe } from "@angular/common";
import { CreateNewUomComponent } from "./components/create-new-uom/create-new-uom.component";
import { UomListComponent } from "./components/uom-list/uom-list.component";
import { UomDetailsComponent } from "./components/uom-details/uom-details.component";
import { FormsModule } from "@angular/forms";
import { SubheaderComponent } from "./components/shared/subheader/subheader.component";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { CountriesListComponent } from "./components/countries-list/countries-list.component";
import { PagenotfoundComponent } from "./pages/pagenotfound/pagenotfound.component";
import { AddNewCustomerComponent } from "./components/add-new-customer/add-new-customer.component";

function initializeKeycloak(keycloak: KeycloakService) {
    return environment.enableAuthGuard
        ? () =>
              keycloak.init({
                  config: {
                      url: environment.keycloakServerUrl!,
                      realm: environment.realm!,
                      clientId: environment.clientId!,
                  },
                  initOptions: {
                      onLoad: "check-sso",
                      silentCheckSsoRedirectUri:
                          window.location.origin +
                          "/assets/silent-check-sso.html",
                  },
                  //decide whether Bearer token should be added to every route or allow exceptions
                  shouldAddToken: (request) => {
                      const { method, url } = request;

                      const isGetRequest = "GET" === method.toUpperCase();
                      const acceptablePaths = ["/assets"];
                      const isAcceptablePathMatch = acceptablePaths.some(
                          (path) => url.includes(path)
                      );

                      return !(isGetRequest && isAcceptablePathMatch);
                  },
              })
        : () => () => {};
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DashboardComponent,
        WarehoustListComponent,
        LoginComponent,
        CreateNewUomComponent,
        UomListComponent,
        UomDetailsComponent,
        SubheaderComponent,
        SidebarComponent,
        CountriesListComponent,
        PagenotfoundComponent,
        AddNewCustomerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        Ui5WebcomponentsModule,
        BrowserAnimationsModule,
        KeycloakAngularModule,
        NgApexchartsModule,
        CommonModule,
        FormsModule,
        MatPaginatorModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
        provideHttpClient(),
        DatePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
