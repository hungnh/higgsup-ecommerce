import {Injectable} from '@angular/core';
import {CanActivate, Router, Routes} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (localStorage.getItem('Authorization')) {
      return true;
    } else {
      this.router.navigate(['auth/login'])
    }
  }
}
