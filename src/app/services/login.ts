import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Login } from '../common/Login';
import { environment } from '../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class LoginService {
   constructor(private http : HttpClient) { }
   private readonly baseUrl = environment.apiBaseUrl;

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
