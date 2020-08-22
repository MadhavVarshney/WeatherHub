import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  //proxy: any = "https://cors-anywhere.herokuapp.com/";

  constructor(private http: HttpClient) { }


  public getLocation(long, lat){
    return this.http.get<any>(environment.locationUrl + long + "&center2=" + lat);
  }
  public getTemp(payLoad){
    return this.http.get<any>(environment.proxy + environment.baseUrl + "weather?address=" + payLoad);
  }

  public getCovidInfo(city, state){
    return this.http.get<any>(environment.CovidUrl + city + "&state=" + state);
  }

  
}
