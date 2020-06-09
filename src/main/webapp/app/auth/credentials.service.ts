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
    const params = new URLSearchParams();
    params.append('grant_type', environment.oath.grantType);
    params.append('redirect_uri', environment.oath.redirectUri);
    params.append('code', code);
    params.append('state', '5mw15H');

    const body = encodeURI(params.toString());
    const authority = btoa(environment.oath.clientId + ':' + environment.oath.clientSecret);
    const _headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic' + ' ' + authority,
    });
    this._http.post(environment.oath.accessTokenUri, body.toString(), { headers: _headers }).subscribe(
      (data) => {
        this.saveToken(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveToken(token: any) {
    const expireDate = new Date().getTime() + 1000 * token.expires_in;
    this.cookieService.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = environment.oath.redirectUri;
  }

  getResource(resourceUrl: string): Observable<any> {
    const _headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Bearer ' + this.cookieService.get('access_token'),
    });
    return this._http.get(resourceUrl, { headers: _headers }).pipe(
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
