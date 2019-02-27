import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PathConfig} from "../constant/path-config";
import {HttpClient} from "@angular/common/http";
import {RegisterDTO} from "../model/register-dto.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<RegisterDTO>{
    return this.http.post<RegisterDTO>(PathConfig.DOMAIN + PathConfig.PORT + PathConfig.API_REGISTER, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  }
}
