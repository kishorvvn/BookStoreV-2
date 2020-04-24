import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in sucessfully');
    }, error => {
      console.log('Login failed!');
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !! token;
    // !! denotes true or false functionality. it token is empty it will return false else true.
  }

  logout(){
    localStorage.removeItem('token');
    console.log('Logged out');
  }
}
