import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResult} from "../model/login-result.model";
import {PathConfig} from "../constant/path-config";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<LoginResult>{
    return this.http.post<LoginResult>(PathConfig.DOMAIN + PathConfig.PORT + PathConfig.API_LOGIN, {
      email: email,
      password: password
    });
  }
}
