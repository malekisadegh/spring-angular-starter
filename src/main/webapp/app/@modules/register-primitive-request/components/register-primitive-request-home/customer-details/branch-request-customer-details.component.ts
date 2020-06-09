import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomerDetailsModel } from '@shared/models/customer-details/customer-details.model';
import { RegisterPrimitiveRequestHomeComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/register-primitive-request-home.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-branch-request-customer-details',
  templateUrl: './branch-request-customer-details.component.html',
  styleUrls: ['./branch-request-customer-details.component.scss'],
})
export class BranchRequestCustomerDetailsComponent implements OnInit {
  customerDetailsModel: CustomerDetailsModel;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<RegisterPrimitiveRequestHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerDetailsModel
  ) {
    this.customerDetailsModel = data;
  }

  ngOnInit() {}

  checker() {
    return this.customerDetailsModel.customerTypeCode === '01';
  }

  foreignChecker(foreign: boolean): string {
    if (foreign) {
      return this.translate.instant('label.public.is');
    } else {
      return this.translate.instant('label.public.is.not');
    }
  }
}
