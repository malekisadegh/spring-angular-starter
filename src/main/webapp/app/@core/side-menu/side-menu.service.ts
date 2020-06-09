import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  constructor(private httpClient: HttpClient) {}

  public getMenuData(): Observable<any> {
    return this.httpClient.get('./content/mock/menu.json');
  }
}
