import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { ORDER_CREATE_URL } from "../constant/urls";
import { OrderMod } from "../model/order/OrderMod";
import { Respond } from "../model/Respond";

@Injectable()
export class OrderService {
  constructor(private http:Http) {}

  create(orderMod:OrderMod):Observable<Respond>{
    return this.http.post(ORDER_CREATE_URL, orderMod).map(res => res.json());
  }
}
