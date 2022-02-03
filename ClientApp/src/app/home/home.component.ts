import { Component } from '@angular/core';
import { Login } from '../angular-models/login.model';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  login: Login = new Login();
  httpService: HttpServiceService;

  constructor(httpService: HttpServiceService) {
    this.httpService = httpService;
  }

  printValues() {
    //DELETE BEFORE PRODUCTION, TESTING ONLY
    console.log('username', this.login.Username);
    console.log('password', this.login.Password);
  }

}
