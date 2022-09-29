import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Respond } from "../../../model/Respond";
import { TeaSessionSummary } from "../../../model/tea-session/TeaSessionSummary";
import { TeaSessionService } from "../../../service/tea-session.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  teaSessions:TeaSessionSummary[] = [];

  constructor(private teaSessionService:TeaSessionService,
    private router: Router,
    activatedRoute:ActivatedRoute) {
    let observable:Observable<Respond>;
    activatedRoute.params.subscribe(params=>{
      if(params.teaSessionName){
        observable = this.teaSessionService.getByName(params.teaSessionName);
      }
      else{
        observable = this.teaSessionService.getPublicSummary();
      }
      observable.subscribe(response=>{
        if(response.status) {
          this.teaSessions = response.data;
        }
      });
    });
  }

  ngOnInit(): void {}

  searchTeaSession(teaSessionName:string){
    this.router.navigateByUrl("/search-tea-session/" + teaSessionName);
}
}
