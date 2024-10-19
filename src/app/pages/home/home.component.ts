import { MainCommunicationService } from "./../../services/main-communication.service";
import {
    AfterViewInit,
    Component,
    NgZone,
    OnInit,
    Renderer2,
    ViewChild,
    viewChild,
} from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs";
import { KeycloakService } from "keycloak-angular";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent implements AfterViewInit {
    @ViewChild("time")
    timeNode: any;

    profileName: string = "John Doe";
    currentDateAndTime: any;

    constructor(
        private authService: AuthService,
        private datePipe: DatePipe,
        private zone: NgZone,
        private renderer: Renderer2,
        private mainCommunicationService: MainCommunicationService,
        private keycloak: KeycloakService
    ) {
        this.currentDateAndTime = this.datePipe.transform(
            new Date(),
            "MMM d, y, h:mm:ss a"
        );

        //fetching logged in user's info
        this.keycloak.loadUserProfile().then((data: any) => {
            this.profileName = this.keycloak.isLoggedIn()
                ? data["firstName"] + " " + data["lastName"]
                : "";
        });
    }
    ngAfterViewInit(): void {
        //running outside angular as it's not gonna affect any other logic
        this.zone.runOutsideAngular(() => {
            setInterval(() => {
                this.renderer.setProperty(
                    this.timeNode.nativeElement,
                    "textContent",
                    this.datePipe.transform(new Date(), "MMM d, y, h:mm:ss a")
                );
            }, 1);
        });
    }

    onLogout() {
        this.authService.logout();
    }
}
