import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  data: any = {};

  constructor(private http: HttpClient) {}

  use(prop: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      this.http.get<{}>(prop).subscribe(
        (properties) => {
          this.data = Object.assign({}, properties || {});
          resolve(this.data);
        },
        (error) => {
          console.log(error);
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}
