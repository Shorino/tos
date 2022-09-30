import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { ORDER_CREATE_URL, ORDER_DELETE_ADMIN_URL, ORDER_DELETE_URL, ORDER_GET_URL, ORDER_MODIFY_ADMIN_URL, ORDER_MODIFY_URL } from "../constant/urls";
import { OrderMod } from "../model/order/OrderMod";
import { Respond } from "../model/Respond";
import { UserCredential } from "../model/user/UserCredential";

@Injectable()
export class OrderService {
  constructor(private http:Http) {}

  create(orderMod:OrderMod):Observable<Respond>{
    return this.http.post(ORDER_CREATE_URL, orderMod).map(res => res.json());
  }

  modify(orderId:number, orderMod:OrderMod, isAdmin: boolean = false):Observable<Respond>{
    let url = ORDER_MODIFY_URL;
    if(isAdmin) url = ORDER_MODIFY_ADMIN_URL;
    return this.http.post(url + orderId, orderMod).map(res => res.json());
  }

  delete(orderId:number, userCredential:UserCredential, isAdmin: boolean = false):Observable<Respond>{
    let url = ORDER_DELETE_URL;
    if(isAdmin) url = ORDER_DELETE_ADMIN_URL;
    return this.http.post(url + orderId, userCredential).map(res => res.json());
  }

  get(orderMod:any):Observable<Respond>{
    // orderMod: username, possword, teaSession
    return this.http.post(ORDER_GET_URL, orderMod).map(res => res.json());
  }
}
