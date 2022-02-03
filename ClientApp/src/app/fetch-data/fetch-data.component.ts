import { Component, Inject } from '@angular/core';
import { HttpServiceService } from '../Services/http-service.service';
import { WeatherForecast } from '../angular-models/weather-forecast.model';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public testString: string;

  constructor(private httpService: HttpServiceService) {
    this.httpService.GetWeatherForecast().subscribe(result => {
      this.forecasts = result;
    });
  }
}
