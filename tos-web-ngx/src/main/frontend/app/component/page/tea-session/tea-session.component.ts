import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { OrderMod } from "../../../model/order/OrderMod";
import { Respond } from "../../../model/Respond";
import { TeaSessionHidePassword } from "../../../model/tea-session/TeaSessionHidePassword";
import { OrderService } from "../../../service/order.service";
import { TeaSessionService } from "../../../service/tea-session.service";

@Component({
  selector: "app-tea-session",
  templateUrl: "./tea-session.component.html",
  styleUrls: ["./tea-session.component.css"],
})
export class TeaSessionComponent implements OnInit {
    teaSession:TeaSessionHidePassword = new TeaSessionHidePassword();
    canPlaceOrder:boolean = true;
    placingOrder:boolean = true;

    orderForm:FormGroup;
    showItemNameEmptyError:boolean = false;
    showQuantityEmptyError:boolean = false;
    showQuantityMinError:boolean = false;

    constructor(activatedRoute:ActivatedRoute, 
      private teaSessionService:TeaSessionService,
      private orderService:OrderService,
      private formBuilder:FormBuilder,
      private router:Router){
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

                if(new Date() > this.teaSession.cutOffDate) this.canPlaceOrder = false;
                else this.canPlaceOrder = true;
              }
            });
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
          alert("Order placed successfully");
        }
        else{
          alert(response.statusMessage);
        }
      });
    }
    
    goToHomePage(){
      this.router.navigateByUrl("/");
    }
}
