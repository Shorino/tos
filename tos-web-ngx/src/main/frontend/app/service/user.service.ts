import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { TEA_SESSION_GET_ALL_SUMMARY_URL } from "../constant/urls";
import { Respond } from "../model/Respond";
import { UserCredential } from "../model/user/UserCredential";

@Injectable()
export class UserService {
  constructor(private http:Http) {}

  login(userCredential:UserCredential):Observable<Respond>{
    return this.http.post(TEA_SESSION_GET_ALL_SUMMARY_URL, userCredential).map(res => res.json());
  }
}
