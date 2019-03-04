import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResult} from "../model/login-result.model";
import {PathConfig} from "../constant/path-config";
import {catchError, map} from "rxjs/operators";
import {HttpService} from "./http.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private router: Router) {
  }

  public login(email: string, password: string): Observable<LoginResult> {
    return this.http.post<LoginResult>(PathConfig.URL + PathConfig.LOG_IN, {
      email: email,
      password: password
    });
  }
}
