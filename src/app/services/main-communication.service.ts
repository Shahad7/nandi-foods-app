import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class MainCommunicationService {
    titleChangeSource = new BehaviorSubject<string | null>(null);
    titleChange$ = this.titleChangeSource.asObservable();

    toggleSidebarSource = new Subject<string>();
    toggleSidebar$ = this.toggleSidebarSource.asObservable();

    manualSideNavigationSource = new Subject<string>();
    manualSideNavigation$ = this.manualSideNavigationSource.asObservable();

    //for alerting subheader component about nested component title change
    alertTitleChange(title: string) {
        this.titleChangeSource.next(title);
    }

    //alert home component to toggle sidebar
    togglerSidebar() {
        this.toggleSidebarSource.next("");
    }

    manualSideNavigate(url: string) {
        this.manualSideNavigationSource.next(url);
    }
}
