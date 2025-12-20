import { Injectable } from '@angular/core';
import { CountryList } from '../common/country-list';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { StateList } from '../common/State-list';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryState {

 private readonly baseUrl = environment.apiBaseUrl;
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



