import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css'
})
export class ListTodosComponent implements OnInit {
  todos = [
    {id: 1, description: 'Learn to Dance'},
    {id: 2, description: 'Visit India'},
    {id: 3, description: 'Visit Egypt'},
    {id: 4, description: 'Visit France'},
    {id: 5, description: 'Visit USA'},
    {id: 5, description: 'Visit Canada'}
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
