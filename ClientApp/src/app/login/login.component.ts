import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../angular-models/login.model';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/** login component*/
export class LoginComponent implements OnInit {

  login: Login = new Login();
  invalidLogin: boolean;
  validLogin: boolean;
  hasClickedLogin: boolean;

  constructor(private http: HttpServiceService, private router: Router) {
  }

  loginUser() {
    this.hasClickedLogin = true;
    this.http.LoginUser(this.login).subscribe(validUser => {
      if (!validUser) {
        this.invalidLogin = true;
      } else {
        this.invalidLogin = false;
        this.http.GetSessionData().subscribe(data => {
          this.http.token = data.token;
          this.http.expiration = new Date(data.expiration);
          this.router.navigateByUrl("hangman-game");
          this.validLogin = true;
        })
        //this.http.GetToken().subscribe(token => {
        //  this.http.token = token;
        //})
        //this.http.GetExpiration().subscribe(expiration => {
        //  this.http.expiration = new Date(expiration);
        //})
        //this.router.navigateByUrl("hangman-game")
        //this.validLogin = true;
      }
    });
  }


  ngOnInit(): void {
  }
}
