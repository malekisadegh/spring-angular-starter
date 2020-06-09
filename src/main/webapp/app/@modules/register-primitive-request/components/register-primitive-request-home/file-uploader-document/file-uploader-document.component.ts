import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterPrimitiveRequestHomeComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/register-primitive-request-home.component';
import { MatTableDataSource } from '@angular/material/table';
import { CollateralDocumentModel, FileSnippetModel } from '@shared/models/collateral/collateral-document.model';

@Component({
  selector: 'app-file-uploader-document',
  templateUrl: './file-uploader-document.component.html',
  styleUrls: ['./file-uploader-document.component.scss'],
})
export class FileUploaderDocumentComponent implements OnInit {
  fileUploaderForm: FormGroup;

  dataSource: any;
  displayedColumns: string[] = ['docType', 'file'];

  constructor(
    public dialogRef: MatDialogRef<RegisterPrimitiveRequestHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Init Table
    this.dataSource = new MatTableDataSource<CollateralDocumentModel>(data.dataSource.documentAttach);
  }

  ngOnInit() {
    this.fileUploaderForm = new FormGroup({});
  }

  bindFileName(file: CollateralDocumentModel) {
    if (file.fileSelect) {
      return file.fileSelect.file.name;
    }
  }

  handleFileInput(event: any, doc: CollateralDocumentModel) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      doc.fileSelect = new FileSnippetModel(event.target.result, file);
      doc.changeFile = true;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Submit To Upload
   */
  saveValue() {
    this.dataSource.data.forEach((value: CollateralDocumentModel) => {
      if (value.fileSelect) {
        value.changeFile = true;
      } else {
        value.changeFile = false;
      }
    });
    this.dialogRef.close();
  }

  deleteFile(collateralDocumentModel: CollateralDocumentModel) {
    collateralDocumentModel.fileSelect = null;
    collateralDocumentModel.changeFile = true;
  }
}
