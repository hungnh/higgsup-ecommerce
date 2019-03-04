import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class TokenInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: String = localStorage.getItem('Authorization');

    if (token) {
      req = req.clone({headers: req.headers.set('Authorization', `${token}`)})
    }

    return next.handle(req);
  }
}
