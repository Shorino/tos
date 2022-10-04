import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserChangePassword } from "../../../model/user/UserChangePassword";
import { UserService } from "../../../service/user.service";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
    userInfo:any = null;
    changePasswordForm:FormGroup;

    constructor(private formBuilder:FormBuilder,
        private router:Router,
        private userService:UserService){
        this.userInfo = JSON.parse(localStorage.getItem("TOS_USER_INFO"));
        if (!this.userInfo) this.router.navigateByUrl("/login");

        this.changePasswordForm = this.formBuilder.group({
            oldPassword:[null],
            newPassword:[null]
        });
    }

    ngOnInit(): void {}

    submitChangePassword(){
        this.userService.changePassword(new UserChangePassword(this.userInfo.username, this.changePasswordForm.controls.oldPassword.value, this.changePasswordForm.controls.newPassword.value))
        .subscribe(response=>{
            if(response.status){
                alert("Password changed successfully");
                this.goToHome();
            }
            else{
                alert(response.statusMessage);
            }
        });
    }

    goToHome(){
        this.router.navigateByUrl("/");
    }
}
