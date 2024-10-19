import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class MainCommunicationService {
    toggleSidebarSource = new Subject<string>();
    toggleSidebar$ = this.toggleSidebarSource.asObservable();

    //alert home component to toggle sidebar
    togglerSidebar() {
        this.toggleSidebarSource.next("");
    }
}
