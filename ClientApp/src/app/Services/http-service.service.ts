import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WeatherForecast } from '../angular-models/weather-forecast.model';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  // this is where you'll create methods to do function calls to the controller
  GetWeatherForecast(): Observable<WeatherForecast[]> {
    // notice the format of the string you're passing as a param: (NameOfController/NameOfFunction)
    return this.http.get<WeatherForecast[]>('WeatherForecast/GetWeather')
      .pipe(catchError(err => this.handleError('Error getting weather data', err)));
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
