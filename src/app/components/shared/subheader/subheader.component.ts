import { ActivatedRoute } from "@angular/router";
import { title } from "process";
import { MainCommunicationService } from "../../../services/main-communication.service";
import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    selector: "app-subheader",
    templateUrl: "./subheader.component.html",
    styleUrl: "./subheader.component.css",
})
export class SubheaderComponent implements OnDestroy, OnInit {
    /** Title of the component */
    @Input()
    title!: string;

    /** Fired when refresh button is clicked */
    @Output()
    onRefresh = new EventEmitter<any>();

    public innerWidth: any;

    constructor(
        private mainCommunicationService: MainCommunicationService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
    }

    ngOnDestroy(): void {}

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.innerWidth = window.innerWidth;
    }

    alertRefresh() {
        this.onRefresh.emit("");
    }

    onToggleSidebar() {
        this.mainCommunicationService.togglerSidebar();
    }
}
