import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterPrimitiveRequestHomeComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/register-primitive-request-home.component';

@Component({
  selector: 'app-common-delete',
  templateUrl: './common-delete.component.html',
  styleUrls: ['./common-delete.component.scss'],
})
export class CommonDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<RegisterPrimitiveRequestHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancel() {
    this.dialogRef.close('No');
  }

  delete() {
    this.dialogRef.close('DELETE');
  }
}
