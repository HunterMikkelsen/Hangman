import { Component, OnInit } from '@angular/core';
import { Login } from '../angular-models/login.model';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  login: Login = new Login();
  httpService: HttpServiceService;
  passwordCheck: string;

  accountCreated: boolean;
  passwordsDontMatch: boolean;
  hasClickedLogin: boolean;

  constructor(httpService: HttpServiceService) {
    this.httpService = httpService;
  }

  addUser() {
    this.hasClickedLogin = true;
    if (this.passwordCheck !== this.login.Password) {
      // create banner that says the passwords don't match!
      this.passwordsDontMatch = true;
    }
    else {
      this.passwordsDontMatch = false;

      this.httpService.SignUpForAccount(this.login).subscribe(loginCreated => {
        this.accountCreated = loginCreated;
      });
    }
  }

  ngOnInit() {
  }

  showUsers() {

  }

}
