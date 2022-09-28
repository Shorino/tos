import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { TEA_SESSION_GET_ALL_SUMMARY_URL, TEA_SESSION_GET_BY_NAME_URL, TEA_SESSION_GET_PUBLIC_SUMMARY_URL } from "../constant/urls";
import { Response } from "../model/Response";
import { UserCredential } from "../model/user/UserCredential";

@Injectable()
export class TeaSessionService {
  constructor(private http:Http) {}

  getAllSummary(userCredential:UserCredential):Observable<Response>{
    return this.http.post(TEA_SESSION_GET_ALL_SUMMARY_URL, userCredential).map(res => res.json());
  }

  getPublicSummary():Observable<Response>{
    return this.http.post(TEA_SESSION_GET_PUBLIC_SUMMARY_URL, {}).map(res => res.json());
  }

  getByName(name:string):Observable<Response>{
    return this.http.post(TEA_SESSION_GET_BY_NAME_URL, name).map(res => res.json());
  }
}
