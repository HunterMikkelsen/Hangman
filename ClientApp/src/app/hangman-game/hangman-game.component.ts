import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman-game',
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.css']
})
export class HangmanGameComponent implements OnInit {

  // calls things before/while the page loads
  constructor() { }

  // any function calls inside of ngOnInit happen after the page has fully loaded all the data from the constructor
  ngOnInit() {
  }

}
