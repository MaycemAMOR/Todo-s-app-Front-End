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
  welcomeMessageFromService = '';

  constructor(
    private router: ActivatedRoute,
    private welcomeDataService: WelcomeDataService
  ) {
  }

  ngOnInit(): void {
    this.name = this.router.snapshot.params["name"];
  }

  getWelcomeMessage() {
    this.welcomeDataService.executeHelloWorldBeanService().subscribe({
        next: (response: any) => this.handleSuccessfulResponse(response),
        error: error => this.handleErrorResponse(error)
      }
    );
  }

  handleSuccessfulResponse(response: any) {
    this.welcomeMessageFromService = response.message;
  }

  private handleErrorResponse(error: any) {
    this.welcomeMessageFromService = error.message;
  }
}
