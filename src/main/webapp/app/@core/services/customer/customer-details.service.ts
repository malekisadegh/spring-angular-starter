import { Injectable } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';

@Injectable()
export class CustomerDetailsService {
  constructor(private connection: ConnectionService) {}

  public getCustomerDetails(nationalCode: string, customerType: string) {
    const url = '/integration-customer/fetch-customer-info';

    return this.connection.postConnection(
      url,
      '{"identifier":"' + nationalCode + '","identifierType":"' + customerType + '"}'
    );
  }

  public fetchAccountInfo(nationalCode: string) {
    const URL = '/integration-account/fetch-account-info/';
    return this.connection.getConnection(URL + nationalCode);
  }
}
