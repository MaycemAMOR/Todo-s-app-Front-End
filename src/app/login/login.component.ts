import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username = 'maycem';
  password = '';

  constructor() {
  }

  ngOnInit() {
  }

  handleLogin() {
    console.log(this.username);
  }
}
