import { Component, Input, OnInit } from '@angular/core';
import { FloorNonCurrentRemainingModel } from '@shared/models/floor/floor-non-current-remaining.model';
import { FacilityInfoModel } from '@shared/models/mock/facility-info.model';

@Component({
  selector: 'app-floor-non-current-remaining',
  templateUrl: './floor-non-current-remaining.component.html',
  styleUrls: ['./floor-non-current-remaining.component.scss'],
})
export class FloorNonCurrentRemainingComponent implements OnInit {
  @Input('facilityInfoMockModel') facilityInfoMockModel: FacilityInfoModel;
  floorNonCurrentRemainingModel = new FloorNonCurrentRemainingModel();

  constructor() {}

  ngOnInit() {
    this.floorNonCurrentRemainingModel.remainingTotalMaturityOfPast = '100000000';
    this.floorNonCurrentRemainingModel.remainingOriginalMaturityPast = '150000000';
    this.floorNonCurrentRemainingModel.remainingProfitMaturityPast = '500000';
    this.floorNonCurrentRemainingModel.remainingObligationMaturityPast = '20000';
    this.floorNonCurrentRemainingModel.remainingCourtCostMaturityPast = '9000';
    this.floorNonCurrentRemainingModel.remainingTotalDeferred = '700000';
    this.floorNonCurrentRemainingModel.remainingOriginalDeferred = '700000';
    this.floorNonCurrentRemainingModel.remainingProfitDeferred = '19000';
    this.floorNonCurrentRemainingModel.remainingObligationDeferred = '100000000';
    this.floorNonCurrentRemainingModel.remainingCourtCostDeferred = '500000';
  }
}
