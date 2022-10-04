import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderMod } from "../../../model/order/OrderMod";
import { OrderShowUsername } from "../../../model/order/OrderShowUsername";
import { UserCredential } from "../../../model/user/UserCredential";
import { EventService } from "../../../service/event.service";
import { OrderService } from "../../../service/order.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
    @Input()
    getAllUsers:boolean = false;
    teaSessionId:number = undefined;

    orders:OrderShowUsername[];
    userInfo:any = null;

    constructor(private orderService:OrderService, 
      private eventService: EventService,
      activatedRoute:ActivatedRoute,
      router:Router){
      this.userInfo = JSON.parse(localStorage.getItem("TOS_USER_INFO"));
      if(!this.userInfo) router.navigateByUrl("/login");

      activatedRoute.params.subscribe(params=>{
        if(params.teaSessionId) this.teaSessionId = params.teaSessionId
      });
    }

    ngOnInit(): void {
      this.updateOrders();
      this.eventService.getEvent().subscribe(eventData=>{
        if(eventData.key == "ORDER_PLACED"){
          this.updateOrders();
        }
      });
    }

    updateOrders(){
      let orderMod = {
        username: !this.getAllUsers? this.userInfo.username : undefined,
        password: !this.getAllUsers? this.userInfo.password : undefined,
        teaSession: this.teaSessionId
      }
      this.orderService.get(orderMod).subscribe(response=>{
        if(response.status) {
          this.orders = response.data;
          this.orders.forEach(order => {
            order.editing = false;
          });
        }
      });
    }

    removeOrder(orderId:number){
      this.orderService.delete(orderId, new UserCredential(this.userInfo.username, this.userInfo.password), this.userInfo.isAdmin).subscribe(response=>{
        if(response.status){
          this.updateOrders();
        }
        else{
          alert(response.statusMessage);
        }
      });
    }

    editOrder(orderId:number, itemName:string, quantity:number, teaSession:number){
      let orderMod = new OrderMod(itemName, quantity, teaSession, this.userInfo.username, this.userInfo.password);
      this.orderService.modify(orderId, orderMod, this.userInfo.isAdmin).subscribe(response=>{
        if(response.status){
          this.updateOrders();
        }
        else{
          alert(response.statusMessage);
        }
      });
    }

    checkAllUsers(enable:boolean){
      this.getAllUsers = enable;
      this.updateOrders();
    }
}
