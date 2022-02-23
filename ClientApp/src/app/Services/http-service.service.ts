import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Login } from '../angular-models/login.model';
import { HighScore } from '../angular-models/highscore.model';
import { GuessedLetter } from '../angular-models/guessedLetter.model';
import { SessionData } from '../angular-models/sessiondata.model';
import { GameState } from '../angular-models/gamestate.model';

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

  GetCorrectWord(): Observable<string> {
    return this.http.get<string>('Hangman/GetWord')
      .pipe(catchError(err => this.handleError('Error getting the correct word', err)));
  }

  GetGameState(): Observable<boolean> {
    return this.http.get<boolean>('Hangman/GetGameState')
      .pipe(catchError(err => this.handleError('Error getting the correct game state', err)));
  }

  SetGameState(state: boolean): Observable<boolean>{
    let gameState = new GameState();

    gameState.State = state;

    return this.http.post<boolean>('Hangman/SetGameState', gameState)
      .pipe(catchError(err => this.handleError('Error getting the correct game state', err)));
  }

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

  SubmitScore(score: HighScore) {
    this.http.post('Hangman/SubmitScore', score)
      .pipe(catchError(err => this.handleError('Error sending high score data', err)));
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
