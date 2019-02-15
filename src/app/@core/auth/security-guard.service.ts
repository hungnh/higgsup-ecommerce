import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {NbAccessChecker} from '@nebular/security';

@Injectable()
export class SecurityGuard implements CanActivate {

  constructor(private accessChecker: NbAccessChecker,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.accessChecker.isGranted('view', route.url[0].path)
      .pipe(
        tap(granted => {
          if (!granted) {
            this.router.navigate(['pages']);
          }
        }),
      );
  }
}
