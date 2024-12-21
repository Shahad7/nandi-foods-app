import { ActivatedRoute } from "@angular/router";
import { title } from "process";
import { MainCommunicationService } from "../../../services/main-communication.service";
import {
    Component,
    EventEmitter,
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

    constructor(
        private mainCommunicationService: MainCommunicationService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {}

    ngOnDestroy(): void {}

    alertRefresh() {
        this.onRefresh.emit("");
    }

    onToggleSidebar() {
        this.mainCommunicationService.togglerSidebar();
    }
}
