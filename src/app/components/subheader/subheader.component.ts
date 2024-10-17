import { title } from "process";
import { MainCommunicationService } from "./../../services/main-communication.service";
import { Component } from "@angular/core";

@Component({
    selector: "app-subheader",
    templateUrl: "./subheader.component.html",
    styleUrl: "./subheader.component.css",
})
export class SubheaderComponent {
    selectedOptionToDisplay!: string;
    constructor(private mainCommunicationService: MainCommunicationService) {
        this.mainCommunicationService.titleChange$.subscribe((title) => {
            this.selectedOptionToDisplay = title;
        });
    }

    onRefresh() {
        //to-do refetch latest data from server
        //should communicate with current child component to update its data
    }

    onToggleSidebar() {}
}
