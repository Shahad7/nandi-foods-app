import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private router: Router) {}

    authenticate(username: string, password: string): boolean {
        //mock
        if (username == "max" && password == "1234") {
            this.loginSuccessHandler({ token: "dummy-token", username });
            return true;
        }

        return false;
    }

    loginSuccessHandler({
        token,
        username,
    }: {
        token: string;
        username: string;
    }): void {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", username);
        this.router.navigate(["/"]);
    }

    isLoggedIn(): boolean {
        const token = sessionStorage.getItem("token");
        const username = sessionStorage.getItem("username");
        return token != null && username != null;
    }

    logout(): void {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.clear();
        this.router.navigate(["/login"]);
    }
}
