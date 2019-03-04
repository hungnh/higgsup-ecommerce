import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {LoginService} from "../services/login.service";
import {HttpService} from "../services/http.service";

export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private httpService: HttpService,
              private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err);
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal

          req = req.clone({headers: req.headers.set('Authorization', this.httpService.getRefreshToken())});
          this.router.navigate(['auth']);

        }
      }
    });
  }
}
