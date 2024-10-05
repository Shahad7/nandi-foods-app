import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from "@angular/core";
import { FormComponent } from "@ui5/webcomponents-ngx/main/form";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../components/snackbar/snackbar.component";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
    username: string = "";
    password: string = "";

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) {}

    updateUsername(event: any) {
        this.username = event.target.valueBeforeSelectionStart;
    }

    updatePassword(event: any) {
        this.password = event.target.valueBeforeSelectionStart;
    }
}
