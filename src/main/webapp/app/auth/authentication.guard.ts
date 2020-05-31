import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Logger } from '@core';
import { CredentialsService } from './credentials.service';
import { environment } from '@env/environment';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  public isLoggedIn = false;

  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
    /*  this.isLoggedIn = this.credentialsService.checkCredentials();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (this.isLoggedIn) {
      return true;
    }
    if (!this.isLoggedIn && code && code.length > 0) {
      this.credentialsService.retrieveToken(code);
    } else {
      //Not authenticated, redirecting and adding redirect url...
      this.credentialsService.getAuthorizationCode();
    }*/
  }
}
