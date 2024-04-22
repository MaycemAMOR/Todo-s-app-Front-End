import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() {
  }

  authenticate(username: string, password: string) {
    if (username === 'maycem' && password === '06864321') {
      sessionStorage.setItem('authenticaterUser', username);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear();
  }

}
