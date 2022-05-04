import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { cities } from '../data/cities';
import { City } from '../models/city';
import { WeatherCard } from '../models/weather-card';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {

  city: City;
  weatherInfo: WeatherCard;
  isFavorite: boolean = false;
  @Input() cityName: string = '';

  constructor(private weatherService: WeatherService,
    private favoritesService: FavoritesService) { }

  getIconUrl(iconId: string): string {
    return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  }

  toggleFavorite() {
    if (this.isFavorite)
      this.favoritesService.removeFromFavorites(this.cityName);
    else
      this.favoritesService.addToFavorites(this.cityName);

    this.checkIfFavorite();
  }

  checkIfFavorite() {
    this.isFavorite = this.favoritesService.isFavoriteCity(this.cityName);
  }

  ngOnInit(): void {
    this.city = cities.find(city => city.name === this.cityName);
    this.checkIfFavorite();

    if (this.city != null) {
      this.weatherService.getWeatherInfo(this.city.lat, this.city.lon)
        .subscribe(response => {
          this.weatherInfo = {
            city: this.cityName,
            temperature: Math.ceil(response.main.temp),
            feelsLike: Math.ceil(response.main.feels_like),
            iconUrl: this.getIconUrl(response.weather[0].icon),
            main: response.weather[0].main,
            description: response.weather[0].description
          }
        });
    }
  }

}
