import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { WeatherResponse } from '../models/api/weather-response';
import { apiKey } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = apiKey;
  private url = 'https://api.openweathermap.org';

  constructor(private http: HttpClient) { }

  getWeatherInfo(lat: number, lon: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('lat', lat);
    searchParams = searchParams.append('lon', lon);
    searchParams = searchParams.append('appid', this.apiKey);
    searchParams = searchParams.append('units', 'metric');
    
		return this.http.get<WeatherResponse>(`${this.url}/data/2.5/weather`,{ params: searchParams })
    .pipe(
      map(response => {
        return <WeatherResponse>{
          main: {
            feels_like: response.main.feels_like,
            temp: response.main.temp
          },
          weather: {
            ...response.weather
          }
        }
      })
    );
	}
}
