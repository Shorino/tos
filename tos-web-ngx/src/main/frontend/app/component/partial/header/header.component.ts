import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {


  constructor(private router:Router) {}

  ngOnInit(): void {}

  removeLoginInfo(){
    localStorage.removeItem("TOS_USER_INFO");
    this.router.navigateByUrl("/login");
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

  get username(){
    if(this.loginStatus){
      return JSON.parse(localStorage.getItem("TOS_USER_INFO")).username;
    }
    else return null;
  }
}
