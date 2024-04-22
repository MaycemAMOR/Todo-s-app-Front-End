import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username = 'maycem';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor() {
  }

  ngOnInit() {
  }

  handleLogin() {
    if (this.username === 'maycem' && this.password === '06864321') {
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }


  }
}
