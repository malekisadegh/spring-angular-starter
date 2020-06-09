import { Component, Inject } from '@angular/core';
import { SimpleRequestHomeComponent } from '@modules/simple-request/components/simple-request-home/simple-request-home.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-response-code',
  templateUrl: './show-response-code.component.html',
  styleUrls: ['./show-response-code.component.scss'],
})
export class ShowResponseCodeComponent {
  responseCode: string;

  constructor(public dialogRef: MatDialogRef<SimpleRequestHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.responseCode = data;
  }
}
