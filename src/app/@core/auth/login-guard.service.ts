import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{

  constructor(private router: Router) { }

  canActivate() {
    if (!localStorage.getItem('Authorization')) {
      return true;
    } else {
      return false
    }
  }
}
