import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertiesService } from '@core/services/local/properties.service';

@Injectable()
export class ConnectionService {
  constructor(private hc: HttpClient, private properties: PropertiesService) {}

  public getConnection(url: string): Observable<any> {
    return this.hc.get(this.properties.data.inquiryService + url, {
      observe: 'response',
    });
  }

  public getConnectionParams(url: string, params: HttpParams): Observable<any> {
    return this.hc.get(this.properties.data.inquiryService + url, {
      observe: 'response',
      params: params,
    });
  }

  public postConnection(url: string, data: any): Observable<any> {
    return this.hc.post(this.properties.data.inquiryService + url, data, {
      observe: 'response',
      responseType: 'json',
    });
  }

  public deleteConnection(url: string): Observable<any> {
    return this.hc.delete(this.properties.data.inquiryService + url, {
      observe: 'response',
    });
  }
}
