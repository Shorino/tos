import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { USER_LOGIN_URL, USER_SIGNUP_URL } from "../constant/urls";
import { Respond } from "../model/Respond";
import { UserCredential } from "../model/user/UserCredential";

@Injectable()
export class UserService {
  constructor(private http:Http) {}

  login(userCredential:UserCredential):Observable<Respond>{
    return this.http.post(USER_LOGIN_URL, userCredential).map(res => res.json());
  }

  signup(userCredential:UserCredential):Observable<Respond>{
    return this.http.post(USER_SIGNUP_URL, userCredential).map(res => res.json());
  }
}
