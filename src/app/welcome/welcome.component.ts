import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HelloWorldBean, WelcomeDataService} from "../service/data/welcome-data.service";
import {AUTHENTICATE_USER} from "../app.constants";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  name: any = '';
  welcomeMessageFromService = '';

  constructor(
    private route: ActivatedRoute,
    private welcomeDataService: WelcomeDataService
  ) {
  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem(AUTHENTICATE_USER);
  }

  getWelcomeMessage() {
    this.welcomeDataService.executeHelloWorldBeanService().subscribe({
        next: (response) => this.handleSuccessfulResponse(response),
        error: error => {
          this.welcomeDataService.handleError(error);
          this.handleErrorResponse(error);
        }
      }
    );
  }

  getWelcomeMessageWithPathVariable() {
    this.welcomeDataService.executeHelloWorldBeanWithPathVariableService(this.name).subscribe({
        next: (response) => this.handleSuccessfulResponse(response),
        error: error => {
          this.welcomeDataService.handleError(error);
          this.handleErrorResponse(error);
        }
      }
    );
  }

  handleSuccessfulResponse(response: HelloWorldBean) {
    this.welcomeMessageFromService = response.message;
  }

  private handleErrorResponse(error: any) {
    this.welcomeMessageFromService = error.message;
  }
}
