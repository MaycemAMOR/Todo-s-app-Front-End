import {Component, OnInit} from '@angular/core';
import {Todo, TodoDataService} from "../service/data/todo-data.service";
import {Router} from "@angular/router";
import {AUTHENTICATE_USER} from "../app.constants";

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css'
})
export class ListTodosComponent implements OnInit {
  username: any = '';
  todos: Todo[] = [];
  errorMessage: string = '';
  message: string | undefined;

  constructor(private todosDataService: TodoDataService, private router: Router) {
  }

  public itemTrackBy(index: number, item: Todo) {
    return item.id;
  }

  ngOnInit(): void {
    this.refreshTodo();
  }

  refreshTodo() {
    this.username = sessionStorage.getItem(AUTHENTICATE_USER);
    this.todosDataService.retrieveAllTodos(this.username).subscribe({
      next: (response) => this.handleSuccessfulResponse(response),
      error: error => {
        this.handleErrorResponse(error);
        this.todosDataService.handleError(error)
      }
    })
  }

  deleteTodo(id: number) {
    this.todosDataService.deleteTodo(this.username, id).subscribe({
      next: () => {
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshTodo();
      },
      error: error => {
        this.handleErrorResponse(error);
        this.todosDataService.handleError(error)
      }
    })
  }

  updateTodo(id: number) {
    this.router.navigate(['/todo/', id]);
  }

  addTodo() {
    this.router.navigate(['/todo', -1]);

  }

  private handleErrorResponse(error: any) {
    this.errorMessage = error.message;
  }

  private handleSuccessfulResponse(response: Todo[]) {
    this.todos = response;
  }
}
