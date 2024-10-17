import { ActivatedRoute } from "@angular/router";
import { title } from "process";
import { MainCommunicationService } from "./../../services/main-communication.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    selector: "app-subheader",
    templateUrl: "./subheader.component.html",
    styleUrl: "./subheader.component.css",
})
export class SubheaderComponent implements OnDestroy {
    selectedOptionToDisplay!: string;
    //subscriptions
    toggleSidebarSubscription: Subscription | undefined;
    enableButtonsSubscription: Subscription | undefined;

    //decide whether to add these buttons
    editButtonAdded: boolean = false;

    constructor(
        private mainCommunicationService: MainCommunicationService,
        private route: ActivatedRoute
    ) {
        this.toggleSidebarSubscription =
            this.mainCommunicationService.titleChange$.subscribe((title) => {
                this.selectedOptionToDisplay = title;
                //later implement a lookup table to see which buttons are needed
                if (this.selectedOptionToDisplay == "UOM Details") {
                    this.editButtonAdded = true;
                } else {
                    this.editButtonAdded = false;
                }
            });
    }

    ngOnDestroy(): void {
        this.toggleSidebarSubscription?.unsubscribe();
    }

    onRefresh() {
        //to-do refetch latest data from server
        //should communicate with current child component to update its data
    }

    onToggleSidebar() {
        this.mainCommunicationService.togglerSidebar();
    }

    //let appropriate child component know when edit is clicked
    onEdit() {
        this.mainCommunicationService.alertEditButtonPress();
    }
}
