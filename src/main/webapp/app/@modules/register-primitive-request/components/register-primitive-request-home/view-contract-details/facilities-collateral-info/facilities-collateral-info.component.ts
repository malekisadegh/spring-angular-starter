import { Component, Input, OnInit } from '@angular/core';
import { FacilitiesModel } from '@shared/models/facilitiesModel';
import { FacilityInfoModel } from '@shared/models/mock/facility-info.model';

@Component({
  selector: 'app-facilities-collateral-info',
  templateUrl: './facilities-collateral-info.component.html',
  styleUrls: ['./facilities-collateral-info.component.scss'],
})
export class FacilitiesCollateralInfoComponent implements OnInit {
  @Input('facilityInfoMockModel') facilityInfoMockModel: FacilityInfoModel;

  facilitiesModel = new FacilitiesModel();

  constructor() {}

  ngOnInit() {
    if (this.facilityInfoMockModel) {
      this.facilitiesModel.facilitiesNumber = this.facilityInfoMockModel.facilityNumber;
      this.facilitiesModel.fullNameDebtor = this.facilityInfoMockModel.debtorFullName;
      this.facilitiesModel.branchCode = this.facilityInfoMockModel.branchCode
        ? this.facilityInfoMockModel.branchCode.toString()
        : '';
      this.facilitiesModel.contractType = this.facilityInfoMockModel.contractType;
      this.facilitiesModel.collateralCode = this.facilityInfoMockModel.contractCode
        ? this.facilityInfoMockModel.contractCode.toString()
        : '';
      this.facilitiesModel.productType = 'قرض الحسنه ازدواج';
      this.facilitiesModel.productCode = '2130';
      this.facilitiesModel.facilitiesPaymentSource = 'بانک/صندوق توسعه';
      this.facilitiesModel.facilitiesOriginalAmount = this.facilityInfoMockModel.facilityAmount
        ? this.facilityInfoMockModel.facilityAmount.toString()
        : '';
      this.facilitiesModel.facilitiesPercentAmount = '20000000';
      this.facilitiesModel.loanHistory = this.facilityInfoMockModel.facilityGrantDate;
      this.facilitiesModel.installmentNumber = this.facilityInfoMockModel.installmentNumber
        ? this.facilityInfoMockModel.installmentNumber.toString()
        : '';
      this.facilitiesModel.installmentDuration = '1';
      this.facilitiesModel.interestRate = '18';
      this.facilitiesModel.interestRateGovernmentCommitment = '4';
      this.facilitiesModel.commitmentRate = '24';
      this.facilitiesModel.totalDebtBalance = this.facilityInfoMockModel.remainingDebtTotal
        ? this.facilityInfoMockModel.remainingDebtTotal.toString()
        : '';
      this.facilitiesModel.originalRemains = '4000000000';
      this.facilitiesModel.profitBalance = '2000000';
    }
  }
}
