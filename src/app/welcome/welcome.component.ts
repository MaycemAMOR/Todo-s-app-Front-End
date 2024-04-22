import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WelcomeDataService} from "../service/data/welcome-data.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  name = '';

  constructor(
    private router: ActivatedRoute,
    private welcomeDataService: WelcomeDataService
  ) {
  }

  ngOnInit(): void {

    console.log(this.router.snapshot.params["name"]);
    this.name = this.router.snapshot.params["name"];
  }

  getWelcomeMessage() {
    this.welcomeDataService.executeHelloWorldBeanService();
  }
}
