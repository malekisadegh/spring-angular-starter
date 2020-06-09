import { DrlRequestContractInfoListModel } from './drl-request-contract-info-list.model';

export class DrlRequestModel {
  userId: number;
  unitId: number;

  requestNumber: string;
  customerType: string;
  cifNationalCode: string;
  agentNationalCode: string;
  depositNumber: string;
  totalRequestAmount: number;

  mainRequestType: number;
  creditRequestType: number;
  requestSubjectType: number;
  requestSupplySource: number;

  mainEconomicPart: number;
  isicEconomicPart: number;
  isicSubEconomicPart: number;

  receivingOfPurpose: number;
  requestCount: number;
  description: string;
  actionId: number;
  status: number;

  drlRequestContractInfoDTOList: DrlRequestContractInfoListModel[];
}
