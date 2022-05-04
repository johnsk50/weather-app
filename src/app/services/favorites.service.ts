import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteCities: string[] = [];

  constructor() {
    this.checkStorage();
  }

  checkStorage() {
    const favs: string[] = JSON.parse(localStorage.getItem('favoriteCities'));

    if (favs)
      this.favoriteCities = favs;
  }

  fetchFavorites(): string[] {
    return this.favoriteCities.slice();
  }

  isFavoriteCity(cityName: string): boolean {
    return this.favoriteCities.findIndex(favCity => favCity === cityName) > -1;
  }

  addToFavorites(cityName: string) {
    this.favoriteCities.push(cityName);
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
  }

  removeFromFavorites(cityName: string) {
    const favCityIndex = this.favoriteCities.findIndex(favCity => favCity === cityName);
    this.favoriteCities.splice(favCityIndex, 1);

    localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
  }
}
