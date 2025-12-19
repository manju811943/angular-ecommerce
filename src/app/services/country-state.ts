import { Injectable } from '@angular/core';
import { CountryList } from '../common/country-list';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { StateList } from '../common/State-list';

@Injectable({
  providedIn: 'root'
})
export class CountryState {

  private baseUrl = "http://15.207.105.107:9090" 
  constructor(private http : HttpClient) { }

 
  getCountryList(){
    const countryUrl = `${this.baseUrl}/countries`;
    return this.http.get<GetResponseCountry>(countryUrl).pipe(
      map(res => {
        return res; 
      })
    )
  }

  getStateList(countryCode:string){
    const stateUrl = `${this.baseUrl}/states/search/findByCountryCode?code=${countryCode}`;
    return this.http.get<GetResponseState>(stateUrl).pipe(
      map(res => {
        return res; 
      })
    )
  }
}


interface GetResponseCountry{
  _embedded :{
    countries : CountryList[]
  }
}

interface GetResponseState{
  _embedded :{
    states : StateList[]
  }
}



