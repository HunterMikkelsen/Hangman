import { Component, OnInit } from '@angular/core';
import { HighScore } from '../angular-models/highscore.model';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-hangman-game',
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.css']
})
export class HangmanGameComponent implements OnInit {

  highScores: HighScore[];
  // calls things before/while the page loads
  constructor(public http: HttpServiceService) {
  }

  // any function calls inside of ngOnInit happen after the page has fully loaded all the data from the constructor
  ngOnInit(): void {
    this.http.GetHighScores()
      .subscribe(highScores => {
        this.highScores = highScores;
      });
  }

}
