import {Component, OnInit} from '@angular/core';
import {HardcodedAuthenticationService} from "../service/hardcoded-authentication.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  // protected isUserLoggedIn = false;
  constructor(public hardcodedAuthenticationService: HardcodedAuthenticationService) {
  }

  ngOnInit(): void {
    // this.isUserLoggedIn = this.hardcodedAuthenticationService.isUserLoggedIn();
    // console.log("this.isUserLoggedIn" + this.isUserLoggedIn);
  }

}
