import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private router: Router, private keycloak: KeycloakService) {}

    isLoggedIn(): boolean {
        return this.keycloak.isLoggedIn();
    }

    logout(): void {
        //has to specify logout redirect url in keycloak server or redirect from here
        this.keycloak.logout(window.origin + "");
    }
}
