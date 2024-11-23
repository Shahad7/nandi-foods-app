import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-tab",
    templateUrl: "./tab.component.html",
    styleUrl: "./tab.component.css",
})
export class TabComponent {
    /** Width of the tab container */
    @Input()
    width: string = "100%";

    /** Array of tab names */
    @Input()
    tabs: Array<string> = [];

    /** Array of tabs which has to be excluded on certain DOM changes or specific conditions */
    @Input()
    excluded: Array<string> = [];

    /** Fires an event to alert the newly selected tab */
    @Output()
    onTabChange: EventEmitter<string> = new EventEmitter();

    alertSelectedTab(event: any) {
        let selectedTab = this.tabs[event.tabIndex / 2];
        this.onTabChange.emit(selectedTab);
    }
}
