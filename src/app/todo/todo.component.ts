import {Component, OnInit} from '@angular/core';
import {Todo, TodoDataService} from "../service/data/todo-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  id: number | undefined;
  username: string = '';
  errorMessage: string = '';
  todo: Todo = new Todo(1, '', '', new Date(), false);

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  saveTodo() {
    this.todoDataService.updateTodo(this.username, this.id, this.todo).subscribe({
      next: (response) => this.router.navigate(['/todos']),
      error: error => {
        this.todoDataService.handleError(error);
        this.handleError(error)
      }
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    // @ts-ignore
    this.username = sessionStorage.getItem('authenticateUser');
    this.todoDataService.getTodo(this.username, this.id).subscribe({
      next: (response => this.todo = response),
      error: error => {
        this.handleError(error);
        this.todoDataService.handleError(error)
      }
    })
  }

  private handleError(error: any) {
    this.errorMessage = error.message;
  }

}
