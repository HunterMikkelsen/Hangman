import { Component } from '@angular/core';
import { Login } from '../angular-models/login.model';
import { } from '@angular/common/http'
import { HttpServiceService } from '../Services/http-service.service';
import { HighScore } from '../angular-models/highscore.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  word: string;
  wordLengthArray: string[];
  letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  correctlyGuessedLetters: string[] = [];
  incorrectlyGuessedLetters: string[] = [];
  pictureUrl: string = "/assets/images/hangman1.png";
  gameInSession: boolean = false;
  correctWord: string = "";
  numGuesses: number = 0;

  constructor(private httpService: HttpServiceService) {
    this.initializeGame(this.gameInSession);
  }

  initializeGame(keepGameState: boolean) {
    this.correctlyGuessedLetters = [];
    this.incorrectlyGuessedLetters = [];
    this.correctWord = "";
    this.incrementPicture(this.incorrectlyGuessedLetters.length);
    if (keepGameState === false) {
      this.httpService.GenerateWord().subscribe(() => {
        this.httpService.InitializeWordLengthString().subscribe(wordString => {
          this.wordLengthArray = wordString.split("");
        });
      });
    }
    else {
      this.fetchData("1");
    }
  }

  validateLetter(letter: string) {
    this.httpService.ValidateUserGuess(letter).subscribe(() => {
      this.fetchData(letter);
      if (!this.correctlyGuessedLetters.includes(letter) && !this.incorrectlyGuessedLetters.includes(letter)) {
        this.numGuesses++;
      }

      // if game is over, fetch the correct word
      if (this.incorrectlyGuessedLetters.length === 5) {
        this.httpService.GetCorrectWord().subscribe(word => {
          this.correctWord = word;
        });
      }
      else if (!this.wordLengthArray.includes('_')) {
        // get date
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;

        // set highscore data
        let newScore = new HighScore();

        newScore.DateTime = new Date(dateTime);
        newScore.Score = this.numGuesses;
      }
    });
  }

  fetchData(letter: string) {
    this.httpService.GetCorrectlyGuessedLetters().subscribe(correctLetters => {
      this.correctlyGuessedLetters = correctLetters.split("");
    });
    this.httpService.GetIncorrectlyGuessedLetters().subscribe(incorrectLetters => {
      this.incorrectlyGuessedLetters = incorrectLetters.split("");
      if (this.incorrectlyGuessedLetters.includes(letter)) {
        this.incrementPicture(this.incorrectlyGuessedLetters.length);
      }
    });
    this.httpService.GetWordLengthString().subscribe(wordString => {
      this.wordLengthArray = wordString.split("");
    });
  }

  startGame() {
    this.gameInSession = true;
  }

  resetGame() {
    this.numGuesses = 0;
    this.gameInSession = false;
    this.initializeGame(false);
    this.gameInSession = true;
  }

  incrementPicture(lengthOfIncorrectLetters: number) {
    this.pictureUrl = "/assets/images/hangman" + (lengthOfIncorrectLetters + 1).toString() + ".png";
  }

}
