import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
    @Input()
    placeholder = "";
    @Input()
    buttonName = "";
    @Output()
    onSearch: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    func(searchTerm:string){
        this.onSearch.emit(searchTerm);
    }
}
