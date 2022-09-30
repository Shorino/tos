import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../service/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private userService:UserService) {}

  ngOnInit(): void {}

  removeLoginInfo(){
    localStorage.removeItem("TOS_USER_INFO");
  }

  get loginStatus(){
    return localStorage.getItem("TOS_USER_INFO")? true: false;
  }

  get isAdmin(){
    if(this.loginStatus){
      return JSON.parse(localStorage.getItem("TOS_USER_INFO")).isAdmin;
    }
    else return false;
  }
}
