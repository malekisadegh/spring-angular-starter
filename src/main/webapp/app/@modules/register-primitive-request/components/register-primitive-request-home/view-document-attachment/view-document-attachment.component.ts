import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterPrimitiveRequestHomeComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/register-primitive-request-home.component';
import { CollateralDocumentModel } from '@shared/models/collateral/collateral-document.model';
import { MatTableDataSource } from '@angular/material/table';
import { ViewFileComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/view-document-attachment/view-file/view-file.component';

@Component({
  selector: 'app-view-document-attachment',
  templateUrl: './view-document-attachment.component.html',
  styleUrls: ['./view-document-attachment.component.scss'],
})
export class ViewDocumentAttachmentComponent implements OnInit {
  documentAttachment: CollateralDocumentModel[];

  dataSource: any;
  displayedColumns: string[] = ['indexColumn', 'docType', 'type', 'file'];

  constructor(
    public dialogRef: MatDialogRef<RegisterPrimitiveRequestHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    this.documentAttachment = data;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<CollateralDocumentModel>(this.documentAttachment);
  }

  viewFile(file: string) {
    const dialogRef = this.dialog.open(ViewFileComponent, {
      width: 'auto',
      data: {
        file: file,
      },
    });

    dialogRef.afterClosed();
  }

  close() {
    this.dialogRef.close();
  }
}
