import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BookStore-SPA';

  jwtHelper = new JwtHelperService();

  // to pluck out token from the console after registration,
  // we need to use authservice and jwt helper method so when browser refreshes we still see username
  constructor(private authService: AuthService){}

  ngOnInit(){
    const token = localStorage.getItem('token');
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
