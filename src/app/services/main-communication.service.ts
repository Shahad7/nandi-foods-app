import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class MainCommunicationService {
    titleChangeSource = new Subject<string>();
    titleChange$ = this.titleChangeSource.asObservable();

    constructor() {}

    //for alerting home component about nested component title change
    alertTitleChange(title: string) {
        this.titleChangeSource.next(title);
    }
}
