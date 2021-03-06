import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterPrimitiveRequestHomeComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/register-primitive-request-home.component';
import { FacilityInfoModel } from '@shared/models/mock/facility-info.model';

@Component({
  selector: 'app-view-contract-details',
  templateUrl: './view-contract-details.component.html',
  styleUrls: ['./view-contract-details.component.scss'],
})
export class ViewContractDetailsComponent {
  facilityInfoMockModel: FacilityInfoModel;

  constructor(
    public dialogRef: MatDialogRef<RegisterPrimitiveRequestHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FacilityInfoModel
  ) {
    this.facilityInfoMockModel = data;
  }
}
