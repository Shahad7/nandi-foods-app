import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormComponent } from "@ui5/webcomponents-ngx/main/form";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../components/shared/snackbar/snackbar.component";
import { AuthService } from "../../services/auth.service";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { environment } from "../../../environments/environment";
import { KeycloakEventType, KeycloakService } from "keycloak-angular";
import { windowWhen } from "rxjs";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
    loginUrl!: any;

    constructor(
        private router: Router,
        private sanitizer: DomSanitizer,
        protected keycloak: KeycloakService
    ) {}

    ngOnInit() {
        if (!this.keycloak.isLoggedIn()) {
            let url = this.keycloak.getKeycloakInstance().createLoginUrl({
                redirectUri: window.location.origin + "/login",
            });

            this.loginUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        } else {
            window.parent.location.assign(window.parent.location.origin);
        }
    }
}
