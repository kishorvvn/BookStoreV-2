import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ){}

  canActivate(): boolean {
    // if user is successfully logged in return canActivate as true
    if (this.authService.loggedIn()){
      return true;
    }

    // else tell them they do not have access
    this.alertify.error('Please login to have an access to the requested page.');
    // redirect them to the home page
    this.router.navigate(['/home']);
    return false;
  }
}
