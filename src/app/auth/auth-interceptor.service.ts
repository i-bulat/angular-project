import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, map, take, tap } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe( 
        take(1), // take(1) will only take the first value of the observable
        exhaustMap( // exhaustMap will wait for the observable to complete before it continues
            (user) => {
                if (!user) { // if user is not logged in then return the request as it is
                    return next.handle(req);
                }
                const modifiedReq = req.clone({ 
                    params: new HttpParams().set('auth', user.token) 
                });
               return next.handle(modifiedReq)
            }))
        }
}