import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { TEA_SESSION_GET_ALL_SUMMARY_URL, TEA_SESSION_GET_BY_ID_URL, TEA_SESSION_GET_BY_NAME_URL, TEA_SESSION_GET_PUBLIC_SUMMARY_URL } from "../constant/urls";
import { Respond } from "../model/Respond";
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
}
