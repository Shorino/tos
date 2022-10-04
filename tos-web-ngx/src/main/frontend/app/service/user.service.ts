import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { USER_CHANGE_PASSWORD_URL, USER_DELETE_URL, USER_ENABLE_URL, USER_GET_ALL_URL, USER_LOGIN_URL, USER_SIGNUP_URL } from "../constant/urls";
import { Respond } from "../model/Respond";
import { UserChangePassword } from "../model/user/UserChangePassword";
import { UserCredential } from "../model/user/UserCredential";
import { UserEnable } from "../model/user/UserEnable";

@Injectable()
export class UserService {
  constructor(private http:Http) {}

  login(userCredential:UserCredential):Observable<Respond>{
    return this.http.post(USER_LOGIN_URL, userCredential).map(res => res.json());
  }

  signup(userCredential:UserCredential):Observable<Respond>{
    return this.http.post(USER_SIGNUP_URL, userCredential).map(res => res.json());
  }

  enable(userEnable:UserEnable):Observable<Respond>{
    return this.http.post(USER_ENABLE_URL, userEnable).map(res => res.json());
  }

  delete(userCredential:UserCredential):Observable<Respond>{
    return this.http.post(USER_DELETE_URL, userCredential).map(res => res.json());
  }

  getAll(userCredential:UserCredential):Observable<Respond>{
    return this.http.post(USER_GET_ALL_URL, userCredential).map(res => res.json());
  }

  changePassword(userCredential:UserChangePassword):Observable<Respond>{
    return this.http.post(USER_CHANGE_PASSWORD_URL, userCredential).map(res => res.json());
  }
}
