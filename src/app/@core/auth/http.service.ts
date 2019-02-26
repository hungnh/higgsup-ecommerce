import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

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
}
