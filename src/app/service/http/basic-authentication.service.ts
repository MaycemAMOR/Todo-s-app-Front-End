import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";


export class AuthenticationBean {
  constructor(public message: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) {
  }

  executeAuthenticationService(username: string, password: string): Observable<AuthenticationBean> {
    /***** on a plus besoin de cette conf grace au service HttpInterceptor ***********/
   /*** dans ce cas j'ai utilisé ici car j'ai désactivé le httpInterceptor at app.module.ts***/

    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    const headers: HttpHeaders = new HttpHeaders({Authorization: basicAuthHeaderString})
    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`, {headers}).pipe(
      map(
        response => {
          sessionStorage.setItem('authenticateUser', username);
          sessionStorage.setItem('token', basicAuthHeaderString);
          return response;
        }
      )
    );
  }

  getAuthenticatedUser(): string | null {
    return sessionStorage.getItem('authenticateUser');
  }

  getAuthenticatedToken(): string | null {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('token');
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticateUser');
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear();
  }

}
