import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class MainCommunicationService {
    titleChangeSource = new Subject<string>();
    titleChange$ = this.titleChangeSource.asObservable();

    toggleSidebarSource = new Subject<string>();
    toggleSidebar$ = this.toggleSidebarSource.asObservable();

    enableEditSource = new Subject<string>();
    enableEdit$ = this.enableEditSource.asObservable();

    //for alerting subheader component about nested component title change
    alertTitleChange(title: string) {
        this.titleChangeSource.next(title);
    }

    //alert home component to toggle sidebar
    togglerSidebar() {
        this.toggleSidebarSource.next("");
    }

    alertEditButtonPress() {
        this.enableEditSource.next("");
    }
}
