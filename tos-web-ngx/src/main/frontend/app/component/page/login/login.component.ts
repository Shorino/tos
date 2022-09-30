import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Respond } from "../../../model/Respond";
import { UserCredential } from "../../../model/user/UserCredential";
import { UserService } from "../../../service/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    signUp:boolean = false;
    loginForm:FormGroup;

    showUsernameEmptyError:boolean = false;
    showPasswordEmptyError:boolean = false;

    constructor(private formBuilder:FormBuilder,
        private userService:UserService,
        private router:Router){
        this.loginForm = this.formBuilder.group({
            username:["", Validators.required],
            password:["", Validators.required]
        });
        if(localStorage.getItem("TOS_USER_INFO")) router.navigateByUrl("/");
    }

    ngOnInit(): void {}

    get fc(){
        return this.loginForm.controls;
    }

    submitLogin(){
        if(this.loginForm.invalid) {
            if(this.fc.username.errors){
                this.showUsernameEmptyError = true;
            }
            if(this.fc.password.errors){
                this.showPasswordEmptyError = true;
            }
            return;
        }
        let observable:Observable<Respond>;
        let userCredential = new UserCredential(this.fc.username.value, this.fc.password.value);
        if(this.signUp){
            observable = this.userService.signup(userCredential);
        }
        else{
            observable = this.userService.login(userCredential);
        }
        observable.subscribe(response=>{
            if(response.status){
                this.router.navigateByUrl("/");
                localStorage.setItem("TOS_USER_INFO", JSON.stringify(response.data));
            }
            else{
                alert(response.statusMessage);
            }
        });
    }
}
