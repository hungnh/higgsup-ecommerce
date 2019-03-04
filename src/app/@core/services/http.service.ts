import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor() {
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
}
