import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-searchbar",
    templateUrl: "./searchbar.component.html",
    styleUrl: "./searchbar.component.css",
})
export class SearchbarComponent {
    /** Fired when searchbar value changes */
    @Output()
    onSearch = new EventEmitter<any>();

    /** Placeholder */
    @Input()
    placeholder = "Enter search criteria ...";

    /** ngModel for search value */
    @Input()
    searchValue = "";

    alertSearch() {
        this.onSearch.emit(this.searchValue);
    }
}
