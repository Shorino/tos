import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { EventData } from "../../../model/EventData";
import { OrderMod } from "../../../model/order/OrderMod";
import { Respond } from "../../../model/Respond";
import { TeaSessionHidePassword } from "../../../model/tea-session/TeaSessionHidePassword";
import { EventService } from "../../../service/event.service";
import { OrderService } from "../../../service/order.service";
import { TeaSessionService } from "../../../service/tea-session.service";

enum PageMode {
  view,
  edit,
  placeOrder,
}

@Component({
  selector: "app-tea-session",
  templateUrl: "./tea-session.component.html",
  styleUrls: ["./tea-session.component.css"],
})
export class TeaSessionComponent implements OnInit {
    teaSession:TeaSessionHidePassword = new TeaSessionHidePassword();
    canPlaceOrder:boolean = true;
    pageMode:PageMode = PageMode.view;

    orderForm:FormGroup;
    showItemNameEmptyError:boolean = false;
    showQuantityEmptyError:boolean = false;
    showQuantityMinError:boolean = false;

    userInfo:any = null;

    constructor(private activatedRoute:ActivatedRoute, 
      private teaSessionService:TeaSessionService,
      private orderService:OrderService,
      private formBuilder:FormBuilder,
      private router:Router,
      private eventService:EventService){
        this.userInfo = JSON.parse(localStorage.getItem("TOS_USER_INFO"));

        this.activatedRoute.params.subscribe(params=>{
            if(params.teaSessionId){
                this.refreshDetails(params.teaSessionId);
            }
        });

        this.orderForm = this.formBuilder.group({
          itemName:["", Validators.required],
          quantity:[1, [Validators.required,Validators.min(1)]]
        });
    }

    ngOnInit(): void {
    }

    get fc(){
      return this.orderForm.controls;
    }

    submitOrder(){
      if(this.orderForm.invalid){
        if(this.fc.itemName.errors){
          this.showItemNameEmptyError = true;
        }
        if(this.fc.quantity.errors){
          if(this.fc.quantity.errors.required) this.showQuantityEmptyError = true;
          if(this.fc.quantity.errors.min) this.showQuantityMinError = true;
        }
        return;
      }
      let userInfo = JSON.parse(localStorage.getItem("TOS_USER_INFO"));
      let orderMod = new OrderMod(this.fc.itemName.value, 
        this.fc.quantity.value,
        this.teaSession.teaSessionId,
        userInfo.username,
        userInfo.password);
      let observable:Observable<Respond> = this.orderService.create(orderMod);
      observable.subscribe((response) => {
        if (response.status) {
          this.eventService.sendEvent(new EventData("ORDER_PLACED", null));
        }
        else{
          alert(response.statusMessage);
        }
      });
    }
    
    refreshDetails(teaSessionId:number){
      this.teaSessionService.getById(teaSessionId).subscribe(response=>{
        if (response.status) {
          this.teaSession = response.data;
          this.teaSession.treatDate = new Date(this.teaSession.treatDate);
          this.teaSession.cutOffDate = new Date(this.teaSession.cutOffDate);

          if(new Date() > this.teaSession.cutOffDate) this.canPlaceOrder = false;
          else this.canPlaceOrder = true;
        }
      });
    }

    goToHomePage(){
      this.router.navigateByUrl("/");
    }

    goToViewSubPage(){
      this.pageMode = PageMode.view;
      this.refreshDetails(this.teaSession.teaSessionId);
    }
}
