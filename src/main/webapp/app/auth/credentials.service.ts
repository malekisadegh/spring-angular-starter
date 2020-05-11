import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';

export class Foo {
  constructor(public id: number, public name: string) {}
}

@Injectable()
export class CredentialsService {
  constructor(private _http: HttpClient, private cookieService: CookieService) {}

  retrieveToken(code: any) {
    let params = new URLSearchParams();
    params.append('grant_type', environment.oath.grantType);
    params.append('redirect_uri', environment.oath.redirectUri);
    params.append('code', code);

    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic ' + btoa(environment.oath.clientId + ':' + environment.oath.clientSecret),
    });
    this._http.post(environment.oath.accessTokenUri, params.toString(), { headers: headers }).subscribe(
      (data) => this.saveToken(data),
      (err) => alert(err)
    );
  }

  saveToken(token: any) {
    let expireDate = new Date().getTime() + 1000 * token.expires_in;
    this.cookieService.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = environment.oath.redirectUri;
  }

  getResource(resourceUrl: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + this.cookieService.get('access_token'),
    });
    return this._http.get(resourceUrl, { headers: headers }).pipe(
      catchError(catchError(this.errorHandler)) // then handle the error
    );
  }

  getAuthorizationCode() {
    window.location.href =
      environment.oath.authorizationUri +
      '?' +
      'response_type=code' +
      '&client_id=' +
      environment.oath.clientId +
      '&redirect_uri=' +
      environment.oath.redirectUri +
      '&state=test' +
      '&grant_type=client_credentials' +
      '&scope=' +
      environment.oath.scope;
  }

  checkCredentials() {
    return this.cookieService.check('access_token');
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'server error.');
  }

  logout() {
    this.cookieService.delete('access_token');
    window.location.reload();
  }
}

/*
import { Injectable } from '@angular/core';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

const credentialsKey = 'credentials';

/!**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 *!/
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /!**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   *!/
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /!**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   *!/
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /!**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   *!/
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
*/
