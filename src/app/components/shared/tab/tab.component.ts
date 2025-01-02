import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from "@angular/core";

@Component({
    selector: "app-tab",
    templateUrl: "./tab.component.html",
    styleUrl: "./tab.component.css",
})
export class TabComponent implements OnChanges {
    // Remove excluded tabs from tabs array, had to be this way so final tab separator logic works
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["excluded"]) {
            let excluded = changes["excluded"];
            excluded.currentValue?.forEach((elt: any) => {
                this.tabs.splice(this.tabs.indexOf(elt), 1);
            });
        }
    }
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
