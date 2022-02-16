import { Component } from '@angular/core';
import { Login } from '../angular-models/login.model';
import {} from '@angular/common/http'
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  word: string;
  wordLengthArray: string[];
  letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  correctlyGuessedLetters: string[] = [];
  incorrectlyGuessedLetters: string[] = [];
  pictureUrl: string = "/assets/images/hangman1.png";
  gameInSession: boolean = false;

  constructor(private httpService: HttpServiceService) {
    if (this.gameInSession !== true) {
      httpService.GenerateWord().subscribe(() => {
        httpService.InitializeWordLengthString().subscribe(wordString => {
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
    });
  }

  fetchData(letter: string) {
    this.httpService.GetCorrectlyGuessedLetters().subscribe(correctLetters => {
      this.correctlyGuessedLetters = correctLetters.split("");
    });
    this.httpService.GetIncorrectlyGuessedLetters().subscribe(incorrectLetters => {
      this.incorrectlyGuessedLetters = incorrectLetters.split("");
      if (this.incorrectlyGuessedLetters.includes(letter)) {
        this.incrementPicture();
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
    this.gameInSession = false;
  }

  incrementPicture() {
    this.pictureUrl = "/assets/images/hangman" + (this.incorrectlyGuessedLetters.length + 1).toString() + ".png";
  }

}
