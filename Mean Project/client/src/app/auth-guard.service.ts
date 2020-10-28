import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor( private auth: AuthenticationService, private router: Router){}

  // tslint:disable-next-line: typedef
  canActivate() {
    if (!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
