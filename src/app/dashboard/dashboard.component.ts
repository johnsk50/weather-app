import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { cities as cityData } from '../data/cities';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  citiesControl = new FormControl();
  cityNames: string[] = [];

  constructor(private favoritesService: FavoritesService) {}

  initControl() {
    this.citiesControl.patchValue(this.favoritesService.fetchFavorites());
  }

  ngOnInit() {
    this.cityNames = cityData.map(city => city.name);    
    
    this.initControl();
  }

}
