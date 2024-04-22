import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";


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
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

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


