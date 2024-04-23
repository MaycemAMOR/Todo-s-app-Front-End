import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
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

  authenticate(username: string, password: string) {
    if (username === 'MayTech' && password === '06864321') {
      sessionStorage.setItem('authenticateUser', username);
      return true;
    } else {
      return false;
    }
  }

  executeHelloWorldBeanService(): Observable<AuthenticationBean> {
    return this.http.get<AuthenticationBean>('http://localhost:8080/hello-world-bean');
  }

  executeAuthenticationService(username: string, password: string): Observable<AuthenticationBean> {
    /***** on a plus besoin de cette conf grace au service HttpInterceptor ***********/
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    const headers: HttpHeaders = new HttpHeaders({Authorization: basicAuthHeaderString})
    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`, {headers});
  }


  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticateUser');
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear();
  }

}
