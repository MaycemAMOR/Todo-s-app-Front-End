import {Component, OnInit} from '@angular/core';
import {Todo, TodoDataService} from "../service/data/todo-data.service";

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css'
})
export class ListTodosComponent implements OnInit {
  username: any = '';
  todos: Todo[] = [];
  errorMessage: string = '';

  constructor(private todosDataService: TodoDataService) {
  }

  public itemTrackBy(index: number, item: Todo) {
    return item.id;
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('authenticaterUser');
    this.todosDataService.retrieveAllTodos(this.username).subscribe({
      next: (response) => this.handleSuccessfulResponse(response),
      error: error => {
        this.handleErrorResponse(error);
        this.todosDataService.handleError(error)
      }
    })
  }


  private handleErrorResponse(error: any) {
    this.errorMessage = error.message;
  }

  private handleSuccessfulResponse(response: Todo[]) {
    this.todos = response;
  }
}
