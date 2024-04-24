import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {API_URL} from "../../app.constants";


export class HelloWorldBean {
  constructor(public message: string) {
  }
}


@Injectable({
  providedIn: 'root'
})


export class WelcomeDataService {

  constructor(
    private http: HttpClient) {
  }

  executeHelloWorldBeanService(): Observable<HelloWorldBean> {
    return this.http.get<HelloWorldBean>('${API_URL}/hello-world-bean');
  }

  executeHelloWorldBeanWithPathVariableService(name: string): Observable<HelloWorldBean> {
    /***** on a plus besoin de cette conf grace au service HttpInterceptor ***********/
    /*const basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
   const headers: HttpHeaders = new HttpHeaders({Authorization: basicAuthHeaderString})*/
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/path-variable/${name}`/*, {headers}*/);
  }

  /*createBasicAuthenticationHttpHeader(): string {
    const username: string = 'user';
    const password: string = 'password';
    return 'Basic ' + window.btoa(username + ':' + password);
  }*/


  public handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      errorMessage = `An error occured:  ${error.error}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errorMessage = `Backend returned code ${error.status}, body was: ` + error.error;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.' +
      '\n' +
      errorMessage));
  }
}


