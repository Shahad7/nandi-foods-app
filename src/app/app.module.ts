import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Ui5WebcomponentsModule } from "@ui5/webcomponents-ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        Ui5WebcomponentsModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
