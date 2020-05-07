import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl = 'http://localhost:5000/api/auth/';
  baseUrl = environment.apiUrl + 'auth/'; // changed because url is defined in environment
  jwtHelper = new JwtHelperService();
  // jwt helper services needed to check the token, if it is expired
  decodedToken: any; // to fetch username from decoded token

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'login', model)
    .pipe (map((response: any) => {
      const user = response;
      if (user){
        localStorage.setItem('token', user.token);
        // decoding a token
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodedToken);
      }
    }));
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register', model);
    // returns observable object so need to subscribe in register component
  }

  loggedIn(){
    // retrive token from local storage
    const token = localStorage.getItem('token');

    // use jwt helperService to see if it is expired
    return !this.jwtHelper.isTokenExpired(token);

    // isTokenExpired returns boolean. in this case if is expired, this returns true and we use ! operator.
    // so if it is expired, returns true and converted to false and visaversa. so we do not have to change our code in othre components

  }
}
