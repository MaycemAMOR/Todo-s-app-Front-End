import {Component, OnInit} from '@angular/core';


export class todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date,
  ) {
  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css'
})
export class ListTodosComponent implements OnInit {
  todos = [
    new todo(1, 'Learn to Dance', false, new Date()),
    new todo(2, 'Visit India', false, new Date()),
    new todo(3, 'Visit Egypt', false, new Date()),
    new todo(4, 'Visit France', false, new Date()),
    new todo(5, 'Visit USA', false, new Date()),
    new todo(5, 'Visit Canada', false, new Date())
  ]

  constructor() {
  }

  public itemTrackBy(index: number, item: todo) {
    return item.id;
  }

  ngOnInit(): void {
  }

}
