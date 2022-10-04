import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"],
})
export class NotFoundComponent implements OnInit {
    @Input()
    visible = false;
    @Input()
    notFoundMessage = "Nothing Found!";
    @Input()
    resetLinkText = "Reset";
    @Input()
    resetLinkRoute = "/";

    ngOnInit(): void {}
}