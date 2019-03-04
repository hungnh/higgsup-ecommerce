import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PathConfig} from "../constant/path-config";
import {HttpService} from "./http.service";
import {ResponseMessageProfile} from "../model/response-message-profile.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  // httpOptions = this.httpService.setHeaderToken();

  public getUserInfo(): Observable<ResponseMessageProfile> {

    return this.http.get<ResponseMessageProfile>(PathConfig.URL + PathConfig.PROFILE);
  }
}
