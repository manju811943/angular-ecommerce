import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Login } from '../common/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 
   constructor(private http : HttpClient) { }

   private baseUrl = "http://15.207.105.107:9090" 

  login(login: Login) {
    const loginUrl = `${this.baseUrl}/login`;
    return this.http.post<GetResponseLogin>(loginUrl, login).pipe(
      map(res => {
        return res;
      })
    );
  }

// login(loginData: Login): Observable<any> {
//     const loginUrl = `${this.baseUrl}/login`;
//     return this.http.post<any>(loginUrl, loginData);
//   }


}

interface GetResponseLogin{
  _embedded :{
    Login : Login[]
  }
}
