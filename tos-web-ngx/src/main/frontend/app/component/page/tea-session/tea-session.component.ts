import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Respond } from "../../../model/Respond";
import { TeaSessionHidePassword } from "../../../model/tea-session/TeaSessionHidePassword";
import { TeaSessionService } from "../../../service/tea-session.service";

@Component({
  selector: "app-tea-session",
  templateUrl: "./tea-session.component.html",
  styleUrls: ["./tea-session.component.css"],
})
export class TeaSessionComponent implements OnInit {
    teaSession:TeaSessionHidePassword = new TeaSessionHidePassword();

    constructor(activatedRoute:ActivatedRoute, private teaSessionService:TeaSessionService){
        let observable:Observable<Respond>;
        activatedRoute.params.subscribe(params=>{
            if(params.teaSessionId){
                observable = this.teaSessionService.getById(params.teaSessionId);
            }
            observable.subscribe((response) => {
              if (response.status) {
                this.teaSession = response.data;
                this.teaSession.treatDate = new Date(this.teaSession.treatDate);
                this.teaSession.cutOffDate = new Date(this.teaSession.cutOffDate);
              }
            });
        })
    }

    ngOnInit(): void {
    }
}
