import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get loginStatus(){
    return localStorage.getItem("TOS_USER_INFO")? true: false;
  }

  removeLoginInfo(){
    localStorage.removeItem("TOS_USER_INFO");
  }
}
