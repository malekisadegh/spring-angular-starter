import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    if (!request.headers.get('Authorization')) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.cookieService.get('access_token')),
      });
      request = request.clone({ headers: request.headers.set('content-type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
    request = request.clone({
      headers: request.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'),
    });
    request = request.clone({
      headers: request.headers.set(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, content-type, Authorization, Accept'
      ),
    });

    return next.handle(request).pipe(
      map(
        (event: HttpEvent<any>) => {
          return event;
        },
        catchError((error) => {
          let data = {};
          data = {
            reason: error && error.error.reason ? error.error.reason : '',
            status: error.status,
          };
          return throwError(error);
        })
      )
    );
  }
}
