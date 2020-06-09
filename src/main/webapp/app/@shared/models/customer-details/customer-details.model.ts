export class CustomerDetailsModel {
  id: number;
  branchCode: number;
  nocrStatus: boolean;
  // yyyy-MM-dd, Miladi
  lastUpdateDate: string;
  cif: string;
  customerType: string;
  // 01, 02
  customerTypeCode: string;
  foreignersStatus: boolean;
  firstName: string;
  lastName: string;
  identityDocumentNumber: string;
  fatherName: string;
  // yyyy-MM-dd, Jalali
  birthDate: string;
  identityDocumentIssuingPlace: string;
  identityDocumentLiteralSeries: string;
  identityDocumentSerial: string;
  address: string;
  nationalIdentifier: string;
  cityCode: string;
  postalCode: string;
  mobileNumber: string;
  saptaNumbers: string[];
}
