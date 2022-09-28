import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Response } from "../../../../model/Response";
import { TeaSession } from "../../../../model/tea-session/TeaSession";
import { TeaSessionService } from "../../../../service/teasession.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  teaSessions:TeaSession[] = [];

  constructor(private teaSessionService:TeaSessionService, activatedRoute:ActivatedRoute) {
    let observable:Observable<Response>;
    activatedRoute.params.subscribe(params=>{
      if(params.teaSessionName){
        observable = this.teaSessionService.getByName(params.teaSessionName)
      }
      else{
        observable = this.teaSessionService.getPublicSummary();
      }
    });
    observable.subscribe(response=>{
      if(response.status) this.teaSessions = response.data;
    });
  }

  ngOnInit(): void {}
}
