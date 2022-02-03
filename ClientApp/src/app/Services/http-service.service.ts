import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Login } from '../angular-models/login.model';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  // this is where you'll create methods to do function calls to the controller

  SignUpForAccount(login: Login): Observable<boolean> {
    return this.http.post<boolean>('Hangman/SignUpForAccount', login)
      .pipe(catchError(err => this.handleError('Error signing up for account', err)));
  }

  public highScores = [];

  GetHighScores() {
    return this.http.get<[]>('Hangman/GetHighScores')
      .pipe(map(data => {
        this.highScores = data;
      }));
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
