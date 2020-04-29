import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }
  // alertify service is injected to display messages

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in sucessfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/books']); // using complete method of subscribe to navigate the user after successful login
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
    // this method checks and returns if token is valid.
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    // redirect user to home page after logout
    this.router.navigate(['']);
  }
}
