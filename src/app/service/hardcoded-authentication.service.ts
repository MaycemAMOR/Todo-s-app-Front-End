import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() {
  }

  autheticate(username: string, password: string) {
    if (username === 'maycem' && password === '06864321') {
      return true;
    } else {
      return false;
    }


  }
}
