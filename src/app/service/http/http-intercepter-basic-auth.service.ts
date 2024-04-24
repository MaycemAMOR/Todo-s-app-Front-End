import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {BasicAuthenticationService} from "./basic-authentication.service";

@Injectable({
  providedIn: 'root'
})

/****** HttpIntercepterBasicAuthService est appellé avant chaque appel de web service *****/

export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(
    private basicAuthenticateService: BasicAuthenticationService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /* const username: string = 'user';
     const password: string = 'password';
     const basicAuthHeaderString: string = 'Basic ' + window.btoa(username + ':' + password);*/
    const basicAuthHeaderString: string | null = this.basicAuthenticateService.getAuthenticatedToken();
    const username: string | null = this.basicAuthenticateService.getAuthenticatedUser();
    /*alert('interceptor username : '+ username);
    alert('interceptor basicAuthHeaderString : '+ basicAuthHeaderString);*/

    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(request);
  }
}
