import { Component } from '@angular/core';
import { Login } from '../angular-models/login.model';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  word: string;
  wordLengthArray: number[];

  constructor() {
    this.word = "beans";

    this.wordLengthArray = Array(this.word.length).fill(0).map((x, i) => i);
  }
}
