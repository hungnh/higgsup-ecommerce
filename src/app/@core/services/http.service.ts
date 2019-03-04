import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {RegisterDTO} from "../model/register-dto.model";
import {LoginResult} from "../model/login-result.model";
import {PathConfig} from "../constant/path-config";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  setHeaderToken() {
    const token = localStorage.getItem('Authorization');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token,
      }),
    };
    return httpOptions;
  }

  getToken() {
    return localStorage.getItem('Authorization');
  }

  getRefreshToken() {
    return localStorage.getItem('RefreshToken');
  }

  setToken(token: string, refreshToken: string) {
    localStorage.setItem('Authorization', 'Bearer ' + token);
    localStorage.setItem('RefreshToken', 'Bearer ' + refreshToken);
  }

  refreshToken(): Observable<string> {
    return this.http.get<string>(PathConfig.URL + PathConfig.TOKEN);
  }
}
