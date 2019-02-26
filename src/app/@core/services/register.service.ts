import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PathConfig} from "../constant/path-config";
import {HttpClient} from "@angular/common/http";
import {RegisterDTO} from "../model/register-dto.model";
import {LoginService} from "./login.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,
              private loginService: LoginService) { }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<RegisterDTO>{
    return this.http.post<RegisterDTO>(PathConfig.DOMAIN + PathConfig.PORT + PathConfig.API_REGISTER, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }).pipe(map((res) => {
      if (res.responseMessage) {
        this.loginService.login(email, password);
      }
      return res;
    }));
  }
}
