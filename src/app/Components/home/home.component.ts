import { ApiServiceService } from './../../Service/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  location: string = "";
  temperature: any;
  rainChance: any;
  locationData: any;
  brief: any;
  lastUpdateOn: any;
  humidity: any;
  windSpeed: any;
  weatherImg: any;
  longitude: any;
  lattitude: any;
  isCelcius: boolean = true;
  day: any;
  sunRise: any;
  sunSet: any;
  NextDaysData: any = [];
  state: any;
  country: any;
  isCovidVisible: boolean = true;
  isNoCovid: boolean = false;
  activeCases: any;
  pendingReports: any;
  decreased: any;
  confirmCases: any;
  recoverCases: any;
  pendingTests: any;
  lastCovidUpdate: any;
  weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  constructor(private apiService: ApiServiceService) { 
    this.longitude = localStorage.getItem('longitude');
    this.lattitude = localStorage.getItem('lattitude');
    localStorage.removeItem('longitude');
    localStorage.removeItem('lattitude');
  }

  ngOnInit(): void {
    this.getLocation(this.longitude, this.lattitude);
    this.todayDate();
    //this.showCovidAlert();
  }

  getLocation(long, lat){
    console.log(long);
    console.log(lat);
    this.apiService.getLocation(long, lat).subscribe(
      data => {
        console.log(data);
        this.location = data.location;
        this.getTempData(this.location);
      },
      error => {
        console.log(error);
      }
    )
  }

  getTempData(payLoad){
    this.apiService.getTemp(payLoad).subscribe(
      data => {
        console.log(data);
        this.temperature = Math.round(data.temp);
        this.rainChance = data.rain
        this.locationData = data.location
        this.brief = data.summary;
        this.lastUpdateOn = data.time;
        this.humidity = data.humidity;
        this.windSpeed = data.windSpeed;
        this.weatherImg = data.icon;
        this.sunRise = data.sunRise;
        this.sunSet = data.sunSet;
        this.NextDaysData = data.sixDays;
        this.state = data.state;
        this.country = data.country;
        this.addDay();
        console.log(this.NextDaysData);
        this.getCovidUpdates(this.locationData, this.state);
      },
      error => {
        console.log(error);
      }
    )
  }

  getCovidUpdates(city, state){
    this.apiService.getCovidInfo(city, state).subscribe(
      data => {
        console.log(data);
        this.confirmCases = data.confirmCase;
        this.activeCases = data.activeCase;
        this.pendingReports = data.pendingReport;
        this.decreased = data.death;
        this.recoverCases = data.recoverCase;
        this.pendingTests = data.pendingTest;
        this.lastCovidUpdate = data.lastUpdate;
      },
      error =>{
        console.log(error);
      }
    );
  }

  todayDate(){
    var today = new Date();
    var day = today.getDay();
    this.day = day;
  }

  submitLocation(event: any){
    if(event.keyCode == 13){
      this.getTempData(this.location);
    }
  }

  clickToConvert(){
    this.changeUnit(this.temperature, this.isCelcius)
  }

  changeUnit(temp, cond){
    if(cond){
      temp = (temp * 1.8) + 32;
      temp = Math.round(temp);
      this.temperature = temp;
      this.isCelcius = false;
    }
    else{
      temp = (temp - 32) * 0.5556 ;
      temp = Math.round(temp);
      this.temperature = temp;
      this.isCelcius = true;
    }
    
  }

  addDay(){
    this.NextDaysData.forEach(element => {
      var day = this.getDaybyDate(element.date);
      var temMax = Math.round(element.temMax);
      var temMin = Math.round(element.temMin);
      element.temMax = temMax;
      element.temMin = temMin;
      element.day = day;
    });
  }

  getDaybyDate(date){
    var tmp = new Date(date);
    return this.weekdays[tmp.getDay()];
  }

  closeCovidSec(){
    this.isCovidVisible = false;
  }

  closeNoCovidSe(){
    this.isNoCovid = true;
  }

}
