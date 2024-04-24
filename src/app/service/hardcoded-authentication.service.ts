import {Injectable} from '@angular/core';
import {AUTHENTICATE_USER} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() {
  }

  authenticate(username: string, password: string) {
    if (username === 'MayTech' && password === '06864321') {
      sessionStorage.setItem(AUTHENTICATE_USER, username);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATE_USER);
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear();
  }

}
