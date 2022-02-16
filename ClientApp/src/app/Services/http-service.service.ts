import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Login } from '../angular-models/login.model';
import { HighScore } from '../angular-models/highscore.model';
import { GuessedLetter } from '../angular-models/guessedLetter.model';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  public token = "";
  public expiration = new Date();

  constructor(private http: HttpClient) {
    this.GetToken().subscribe(t => {
      this.token = t;
    });
    this.GetExpiration().subscribe(exp => {
      this.expiration = new Date(exp);
    });
  }

  // this is where you'll create methods to do function calls to the controller
  GenerateWord(): Observable<boolean> {
    return this.http.get<boolean>('Hangman/GenerateWord')
      .pipe(catchError(err => this.handleError('Error generating random word', err)));
  }

  GetWordLengthString(): Observable<string> {
    return this.http.get<string>('Hangman/GetWordLengthString')
      .pipe(catchError(err => this.handleError('Error getting word length string', err)));
  }

  ValidateUserGuess(letter: string): Observable<boolean> {
    let guessedLetter = new GuessedLetter();
    guessedLetter.letter = letter;

    return this.http.post<boolean>('Hangman/ValidateUserGuess', guessedLetter)
      .pipe(catchError(err => this.handleError('Error validating user guess', err)));
  }

  InitializeWordLengthString(): Observable<string> {
    return this.http.get<string>('Hangman/InitializeWordLengthString')
      .pipe(catchError(err => this.handleError('Error initializing word length string', err)));
  }

  GetCorrectlyGuessedLetters(): Observable<string> {
    return this.http.get<string>('Hangman/GetCorrectlyGuessedLetters')
      .pipe(catchError(err => this.handleError('Error getting correctly guessed letters', err)));
  }

  GetIncorrectlyGuessedLetters(): Observable<string> {
    return this.http.get<string>('Hangman/GetIncorrectlyGuessedLetters')
      .pipe(catchError(err => this.handleError('Error getting incorrectly guessed letters', err)));
  }

  SignUpForAccount(login: Login): Observable<boolean> {
    //Hangman/SignUpForAccount Hangman = hangmancontroller Signupforaccount = signupforaccountt function in hangman controller
    return this.http.post<boolean>('Hangman/SignUpForAccount', login)
      .pipe(catchError(err => this.handleError('Error signing up for account', err)));
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
