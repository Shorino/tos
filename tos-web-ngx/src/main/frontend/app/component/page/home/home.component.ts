import { InvokeFunctionExpr } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Respond } from "../../../model/Respond";
import { TeaSessionGetByName } from "../../../model/tea-session/TeaSessionGetByName";
import { TeaSessionSummary } from "../../../model/tea-session/TeaSessionSummary";
import { UserCredential } from "../../../model/user/UserCredential";
import { TeaSessionService } from "../../../service/tea-session.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userInfo:any = null;
  teaSessions:TeaSessionSummary[] = [];

  constructor(private teaSessionService:TeaSessionService,
    private router: Router,
    activatedRoute:ActivatedRoute) {
    let observable:Observable<Respond>;
    activatedRoute.params.subscribe(params=>{
      this.userInfo = JSON.parse(localStorage.getItem("TOS_USER_INFO"));

      if(params.teaSessionName){
        let teaSessionGetByName = this.userInfo ?
        new TeaSessionGetByName(this.userInfo.username, this.userInfo.password, params.teaSessionName):
        new TeaSessionGetByName(null, null, params.teaSessionName);
        observable = this.teaSessionService.getByName(teaSessionGetByName);
      }
      else{
        let userCredential = this.userInfo ?
        new UserCredential(this.userInfo.username, this.userInfo.password):
        new UserCredential(null, null);
        observable = this.teaSessionService.getAllSummary(userCredential);
      }
      observable.subscribe(response=>{
        if(response.status) {
          this.teaSessions = response.data;
        }
        else{
          alert(response.statusMessage);
        }
      });
    });
  }

  ngOnInit(): void {}

  searchTeaSession(teaSessionName:string){
    this.router.navigateByUrl("/search-tea-session/" + teaSessionName);
  }

  goToCreateSession(){
    if(localStorage.getItem("TOS_USER_INFO")) this.router.navigateByUrl("/create-session");
    else this.router.navigateByUrl("/login");
  }
}
