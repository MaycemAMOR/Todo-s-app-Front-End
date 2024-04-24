import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {API_URL} from "../../app.constants";

export class Todo {
  constructor(public id: number,
              public username: string,
              public description: string,
              public targetDate: Date,
              public isDone: boolean) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) {
  }

  retrieveAllTodos(name: any): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${API_URL}/users/${name}/todos`);
  }

  deleteTodo(name: any, id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${API_URL}/users/${name}/todos/${id}`);
  }

  getTodo(name: any, id: number | undefined): Observable<Todo> {
    return this.http.get<Todo>(`${API_URL}/users/${name}/todos/${id}`);
  }

  updateTodo(name: any, id: number | undefined, todo: Todo) {
    return this.http.put(`${API_URL}/users/${name}/todos/${id}`, todo);
  }

  createTodo(name: any, id: number | undefined, todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${API_URL}/users/${name}/todos`, todo);
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
