import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { TEA_SESSION_CREATE_URL, TEA_SESSION_DELETE_ADMIN_URL, TEA_SESSION_DELETE_URL, TEA_SESSION_GET_ALL_SUMMARY_URL, TEA_SESSION_GET_BY_ID_URL, TEA_SESSION_GET_BY_NAME_URL, TEA_SESSION_GET_PUBLIC_SUMMARY_URL, TEA_SESSION_MODIFY_ADMIN_URL, TEA_SESSION_MODIFY_PASSWORD_ADMIN_URL, TEA_SESSION_MODIFY_PASSWORD_URL, TEA_SESSION_MODIFY_URL } from "../constant/urls";
import { Respond } from "../model/Respond";
import { TeaSessionChangePassword, TeaSessionChangePasswordAdmin } from "../model/tea-session/TeaSessionChangePassword";
import { TeaSessionShowUsername } from "../model/tea-session/TeaSessionShowUsenameBean";
import { UserCredential } from "../model/user/UserCredential";

@Injectable()
export class TeaSessionService {
  constructor(private http:Http) {}

  getAllSummary(userCredential:UserCredential):Observable<Respond>{
    return this.http.post(TEA_SESSION_GET_ALL_SUMMARY_URL, userCredential).map(res => res.json());
  }

  getPublicSummary():Observable<Respond>{
    return this.http.post(TEA_SESSION_GET_PUBLIC_SUMMARY_URL, {}).map(res => res.json());
  }

  getByName(name:string):Observable<Respond>{
    return this.http.post(TEA_SESSION_GET_BY_NAME_URL, name).map(res => res.json());
  }

  getById(id:number):Observable<Respond>{
    return this.http.post(TEA_SESSION_GET_BY_ID_URL + id, {}).map(res => res.json());
  }

  create(teaSessionShowUsername:TeaSessionShowUsername):Observable<Respond>{
    return this.http.post(TEA_SESSION_CREATE_URL, teaSessionShowUsername).map(res => res.json());
  }

  modify(teaSessionId:number, teaSessionShowUsername:TeaSessionShowUsername, isAdmin: boolean = false):Observable<Respond>{
    let url = TEA_SESSION_MODIFY_URL;
    if(isAdmin) url = TEA_SESSION_MODIFY_ADMIN_URL;
    return this.http.post(url + teaSessionId, teaSessionShowUsername).map(res => res.json());
  }

  modifyPassword(teaSessionId:number, teaSessionChangePassword:TeaSessionChangePassword|TeaSessionChangePasswordAdmin, isAdmin: boolean = false):Observable<Respond>{
    let url = TEA_SESSION_MODIFY_PASSWORD_URL;
    if(isAdmin) url = TEA_SESSION_MODIFY_PASSWORD_ADMIN_URL;
    return this.http.post(url + teaSessionId, teaSessionChangePassword).map(res => res.json());
  }

  delete(teaSessionId:number, userCredential:UserCredential|String, isAdmin: boolean = false):Observable<Respond>{
    let url = TEA_SESSION_DELETE_URL;
    if(isAdmin) url = TEA_SESSION_DELETE_ADMIN_URL;
    return this.http.post(url + teaSessionId, userCredential).map(res => res.json());
  }
}
