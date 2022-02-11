import { Component } from '@angular/core';
import { Login } from '../angular-models/login.model';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  word: string;
  wordLengthArray: string[];
  wordLengthArrayToFill: string[] = [];
  letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  correctlyGuessedLetters: string[] = [];
  incorrectlyGuessedLetters: string[] = [];
  pictureUrl: string = "/assets/images/hangman1.png";

  constructor() {
    // make this randomly generated from a text file, at some point
    this.word = "california";

    this.wordLengthArray = this.word.split("");

    this.wordLengthArray.forEach(letter => {
      this.wordLengthArrayToFill.push("_ ");
    });
  }

  validateLetter(letter: string) {
    if (this.word.includes(letter)) {
      if (!this.correctlyGuessedLetters.includes(letter)) {
        this.correctlyGuessedLetters.push(letter);
      }

      let startPos = 0;
      this.wordLengthArray.forEach(newLetter => {
        let positionOfLetterInWord = this.word.indexOf(letter, startPos);

        if (positionOfLetterInWord !== null) {
          this.wordLengthArrayToFill[positionOfLetterInWord] = letter + " ";

          startPos = positionOfLetterInWord + 1;
        }
      });
    }
    else {
      if (!this.incorrectlyGuessedLetters.includes(letter)) {
        this.incorrectlyGuessedLetters.push(letter);
      }

      if (this.incorrectlyGuessedLetters.length < 7) {
        this.incrementPicture(); this.incrementPicture();
      }
    }    
  }

  incrementPicture() {
    this.pictureUrl = "/assets/images/hangman" + (this.incorrectlyGuessedLetters.length + 1).toString() + ".png";
  }
}
