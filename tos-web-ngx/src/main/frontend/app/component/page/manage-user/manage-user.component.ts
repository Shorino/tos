import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../../model/user/User";
import { UserCredential } from "../../../model/user/UserCredential";
import { UserEnable } from "../../../model/user/UserEnable";
import { UserService } from "../../../service/user.service";
@Component({
  selector: "app-manage-user",
  templateUrl: "./manage-user.component.html",
  styleUrls: ["./manage-user.component.css"],
})
export class ManageUserComponent implements OnInit {
    userInfo:any = null;
    users:User[] = [];

    constructor(private userService:UserService,
        private router:Router){
        this.userInfo = JSON.parse(localStorage.getItem("TOS_USER_INFO"));
        if (!this.userInfo) this.router.navigateByUrl("/login");

        this.userService.getAll(new UserCredential(this.userInfo.username, this.userInfo.password)).subscribe(response=>{
            if (response.status) {
                this.users = response.data;
                this.users.forEach(user => {
                    user.lastLoginDate = new Date(user.lastLoginDate);
                });
                console.log(this.users);
            }
        });
    }

    ngOnInit(): void {}

    enableUser(usernameToEnable:string, enable:boolean){
        let userEnable = new UserEnable(this.userInfo.username,
            this.userInfo.password,
            usernameToEnable,
            enable);
        this.userService.enable(userEnable).subscribe(response=>{
            if(!response.status){
                alert(response.statusMessage);
            }
        });
    }
}
