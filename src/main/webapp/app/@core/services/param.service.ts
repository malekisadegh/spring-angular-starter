import { Injectable } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ParamService {
  baseURL = '/param';
  paramConfig = '/general-config/relation';

  constructor(private service: ConnectionService) {}

  public findEconomicSection(type: number, parentId: number) {
    const url = this.baseURL + '/economic/economic-section';
    let params = new HttpParams();

    params = params.append('type', type.toString());

    if (parentId) {
      params = params.append('parentId', parentId.toString());
    }

    return this.service.getConnectionParams(url, params);
  }

  public getProductDocument(productId: number) {
    const url = this.baseURL + this.paramConfig + '/product-doc/';
    return this.service.getConnection(url + productId);
  }
}
