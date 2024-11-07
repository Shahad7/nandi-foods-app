import { ActivatedRoute } from "@angular/router";
import { title } from "process";
import { MainCommunicationService } from "../../../services/main-communication.service";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    selector: "app-subheader",
    templateUrl: "./subheader.component.html",
    styleUrl: "./subheader.component.css",
})
export class SubheaderComponent implements OnDestroy, OnInit {
    @Input()
    title!: string;

    constructor(
        private mainCommunicationService: MainCommunicationService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {}

    ngOnDestroy(): void {}

    onRefresh() {
        //to-do refetch latest data from server
        //should communicate with current child component to update its data
    }

    onToggleSidebar() {
        this.mainCommunicationService.togglerSidebar();
    }
}
