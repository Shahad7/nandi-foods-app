import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import Keycloak from "../../../public/assets/keycloak";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(
        protected override readonly router: Router,
        protected readonly keycloak: KeycloakService
    ) {
        super(router, keycloak);
        console.log(Keycloak);
    }

    public async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        // Force the user to log in if currently unauthenticated.
        if (!this.authenticated) {
            let k = new Keycloak({
                url: environment.keycloakServerUrl!,
                realm: environment.realm!,
                clientId: environment.clientId!,
            });
            k.init({
                initOptions: {
                    checkLoginIframe: false,
                    onLoad: "check-sso",
                    silentCheckSsoRedirectUri:
                        window.location.origin +
                        "/assets/silent-check-sso.html",
                },
            });
            k.createLoginUrl({
                redirectUri: window.location.origin + state.url,
            }).then((url) => {
                sessionStorage.setItem("url", url);
                this.router.navigate(["login"]);
            });

            // await this.keycloak.login({
            //     redirectUri: window.location.origin + state.url,
            // });
        }

        //Get the roles required from the route.
        const requiredRoles = route.data["roles"];

        // Allow the user to proceed if no additional roles are required to access the route.
        if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
            return true;
        }

        // Allow the user to proceed if all the required roles are present.
        return requiredRoles.every((role) => this.roles.includes(role));
    }
}
