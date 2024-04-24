import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL, AUTHENTICATE_USER, TOKEN} from "../../app.constants";


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

  executeJWTAuthenticationService(username: string, password: string): Observable<AuthenticationBean> {
    return this.http.post<any>(`${API_URL}/authenticate`, {username, password}).pipe(
      map(
        response => {
          sessionStorage.setItem(AUTHENTICATE_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${response.token}`);
          return response;
        }
      )
    );
  }

  executeAuthenticationService(username: string, password: string): Observable<AuthenticationBean> {
    /***** on a plus besoin de cette conf grace au service HttpInterceptor ***********/
    /*** dans ce cas j'ai utilisé ici car j'ai désactivé le httpInterceptor at app.module.ts***/

    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    const headers: HttpHeaders = new HttpHeaders({Authorization: basicAuthHeaderString})
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, {headers}).pipe(
      map(
        response => {
          sessionStorage.setItem(AUTHENTICATE_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return response;
        }
      )
    );
  }

  getAuthenticatedUser(): string | null {
    return sessionStorage.getItem(AUTHENTICATE_USER);
  }

  // @ts-ignore
  getAuthenticatedToken(): string | null {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATE_USER);
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear();
  }

}
