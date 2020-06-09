import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { DrlRequestModel } from '@shared/models/simple-request/drl-request.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InitialRequestService {
  mainURL = '/integration-inquiry-collateral';

  constructor(private connection: ConnectionService, private hc: HttpClient) {}

  public registerInitialRequestCollateral(drlRequestModel: DrlRequestModel) {
    return this.hc.post('http://localhost:9010/drl/api/request', JSON.stringify(drlRequestModel), {
      observe: 'response',
      responseType: 'json',
    });
  }

  public getDocumentAttachmentByContractId(contractId: number) {
    const URL = '/fetch-document-attachment-by-contract-id/';
    return this.connection.getConnection(this.mainURL + URL + contractId);
  }
}
