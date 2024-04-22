import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() {
  }

  autheticate(username: string, password: string) {
    //console.log('before ' + this.isUserLoggedIn());
    if (username === 'maycem' && password === '06864321') {
      sessionStorage.setItem('authenticaterUser', username);
      //console.log('after ' + this.isUserLoggedIn());
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
