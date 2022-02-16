import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Login } from '../angular-models/login.model';
import { HighScore } from '../angular-models/highscore.model';
import { SessionData } from '../angular-models/sessiondata.model';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  public token = "";
  public expiration = new Date();



  constructor(private http: HttpClient) {
    this.GetSessionData().subscribe(data => {
      this.token = data.token;
      this.expiration = new Date(data.expiration);
    });
  }

  // this is where you'll create methods to do function calls to the controller

  SignUpForAccount(login: Login): Observable<boolean> {
    //Hangman/SignUpForAccount Hangman = hangmancontroller Signupforaccount = signupforaccountt function in hangman controller
    return this.http.post<boolean>('Hangman/SignUpForAccount', login)
      .pipe(catchError(err => this.handleError('Error signing up for account', err)));
  }

  GetSessionData(): Observable<SessionData> {
    return this.http.get<SessionData>('Hangman/GetSessionData')
      .pipe(catchError(err => this.handleError('Error getting session data', err)));
  }
  
  GetHighScores(): Observable<HighScore[]> {
    return this.http.get<HighScore[]>('Hangman/GetHighScores')
      .pipe(catchError(err => this.handleError('Error getting high score data', err)));
  }

  GetToken(): Observable<string> {
    return this.http.get<string>('Hangman/GetToken')
      .pipe(catchError(err => this.handleError('Error getting token', err)));
  }

  GetExpiration(): Observable<string> {
    return this.http.get<string>('Hangman/GetExpiration')
      .pipe(catchError(err => this.handleError('Error getting expiration', err)));
  }

  get LoginRequired(): boolean {
    return this.token.length === 0 || this.expiration < new Date();
  }

  LoginUser(login: Login): Observable<boolean> {
    return this.http.post<boolean>('Hangman/LoginUser', login)
      .pipe(catchError(err => this.handleError('Error signing up for account', err)));
  }

  private handleError(message: string, error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError('An error occured');
  }
}
