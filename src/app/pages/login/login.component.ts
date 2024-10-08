import {
    CUSTOM_ELEMENTS_SCHEMA,
    Component,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";
import { FormComponent } from "@ui5/webcomponents-ngx/main/form";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../components/snackbar/snackbar.component";
import { AuthService } from "../../services/auth.service";
import { NavigationStart, Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { environment } from "../../../environments/environment";
@Component({
    selector: "app-login",
    standalone: true,
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {
    loginUrl!: any;

    constructor(private router: Router, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        // console.log(this.router.getCurrentNavigation()?.extras);
        // alert(this.router.getCurrentNavigation()?.extras.state!["loginUrl"]);
        // this.loginUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        //     this.router.getCurrentNavigation()?.extras.state!["loginUrl"]
        // );
        this.loginUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            sessionStorage.getItem("url")!
        );

        window.addEventListener("message", (event) => {
            // Make sure the origin is correct

            if (event.origin.endsWith("login")) {
                alert("hey");
                this.router.navigate([event.data]);
            }
        });

        this.router.events.subscribe(() => {
            alert("hey");
        });
    }
}
