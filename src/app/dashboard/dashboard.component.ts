import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { cities as cityData } from '../data/cities';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  citiesControl = new FormControl();
  cityNames: string[] = [];

  ngOnInit() {
    this.cityNames = cityData.map(city => city.name);
  }

}
