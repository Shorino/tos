import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { Respond } from "../model/Respond";
import { UserCredential } from "../model/user/UserCredential";

@Injectable()
export class OrderService {
  constructor(private http:Http) {}
}
