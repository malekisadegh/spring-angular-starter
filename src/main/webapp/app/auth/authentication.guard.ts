import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Logger } from '@core';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  public isLoggedIn = false;

  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /*return true;*/
    this.isLoggedIn = this.credentialsService.checkCredentials();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (this.isLoggedIn) {
      return true;
    }
    if (!this.isLoggedIn && code && code.length > 0) {
      this.credentialsService.retrieveToken(code);
    } else {
      this.credentialsService.getAuthorizationCode();
    }
  }
}
