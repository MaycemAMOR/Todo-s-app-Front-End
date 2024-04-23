import {Component, OnInit} from '@angular/core';
import {Todo, TodoDataService} from "../service/data/todo-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  id!: number;
  username: string = '';
  errorMessage: string = '';
  todo: Todo = new Todo(1, '', '', new Date(), false);

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  saveTodo() {
    if (this.id != -1) {
      this.todoDataService.updateTodo(this.username, this.id, this.todo).subscribe({
        next: () => this.router.navigate(['/todos']),
        error: error => {
          this.todoDataService.handleError(error);
          this.handleError(error)
        }
      });
    } else {
      this.todo.username = this.username;
      this.todoDataService.createTodo(this.username, this.id, this.todo).subscribe({
        next: () => this.router.navigate(['/todos']),
        error: error => {
          this.todoDataService.handleError(error);
          this.handleError(error)
        }
      });
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.todo = new Todo(this.id, '', '', new Date(), false);
    // @ts-ignore
    this.username = sessionStorage.getItem('authenticateUser');
    if (this.id != -1) {
      this.todoDataService.getTodo(this.username, this.id).subscribe({
        next: (response => this.todo = response),
        error: error => {
          this.handleError(error);
          this.todoDataService.handleError(error)
        }
      })
    }

  }

  private handleError(error: any) {
    this.errorMessage = error.message;
  }

}
