import { Component, OnInit, ViewChild } from '@angular/core';
import { StaticValueService } from '@shared/util/static-value.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectMapModel } from '@shared/models/public/select-map.model';
import { MatSort } from '@angular/material/sort';
import { CustomerDetailsService } from '@core/services/customer/customer-details.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CustomerDetailsModel } from '@shared/models/customer-details/customer-details.model';
import { MatDialog } from '@angular/material/dialog';
import { BranchRequestCustomerDetailsComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/customer-details/branch-request-customer-details.component';
import { ViewContractDetailsComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/view-contract-details/view-contract-details.component';
import { FacilityInfoModel } from '@shared/models/mock/facility-info.model';
import { FacilityInfoMockService } from '@shared/models/mock/facility-info-mock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { CommonDeleteComponent } from '@modules/register-primitive-request/components/common-delete/common-delete.component';
import { FileUploaderDocumentComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/file-uploader-document/file-uploader-document.component';
import { PublicUtilityService } from '@shared/util/public-utility.service';
import { ParamService } from '@core/services/param.service';
import { NotificationService } from '@core/services/notification.service';
import { ParamModel } from '@shared/models/public/param.model';
import { CollateralDocumentModel } from '@shared/models/collateral/collateral-document.model';
import { InitialRequestService } from '@core/services/request/initial-request.service';
import { ViewDocumentAttachmentComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/view-document-attachment/view-document-attachment.component';

@Component({
  selector: 'app-register-primitive-request-home',
  templateUrl: './register-primitive-request-home.component.html',
  styleUrls: ['./register-primitive-request-home.component.scss'],
})
export class RegisterPrimitiveRequestHomeComponent implements OnInit {
  componentTitle = 'register-primitive-request';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  registerPrimitiveRequestForm: FormGroup;
  contractListForm: FormGroup;
  detailsForm: FormGroup;

  registerButtonDisable = false;
  disabledPage = false;

  customerTypeList: SelectMapModel[];
  contractList = FacilityInfoMockService.facilityInfoMockList;
  customerDetails: CustomerDetailsModel;

  facilityInfoMockList: FacilityInfoModel;
  paramDocumentList: ParamModel[];

  dataSource: any;
  displayedColumns: string[] = [
    'contractNumber',
    'contractType',
    'originalAmountContract',
    'interestRateStatedContract',
    'debtRemaining',
    'recordFrequencyDelays',
    'details',
  ];

  constructor(
    private customerDetailsService: CustomerDetailsService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private paramService: ParamService,
    private notificationService: NotificationService,
    private initialRequestService: InitialRequestService
  ) {}

  ngOnInit() {
    this.customerTypeList = StaticValueService.customerTypeList;
    this.registerPrimitiveRequestForm = new FormGroup({
      customerType: new FormControl(null, [Validators.required]),
      customerNumber: new FormControl(null, [Validators.required]),
    });
    this.contractListForm = new FormGroup({
      contract: new FormControl(null, [Validators.required]),
    });
    this.detailsForm = new FormGroup({
      actionsTakenOnCollateral: new FormControl(null),
      mobile: new FormControl(null),
      details: new FormControl(null),
    });

    this.dataSource = new MatTableDataSource<FacilityInfoModel>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = this.translate.instant('table.items.per.page');

    /**
     * Get ParamDoc List
     */
    this.paramService.getProductDocument(PublicUtilityService.PARAM_DOC_TYPE).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200 && response.body && response.body.length > 0) {
          this.paramDocumentList = response.body;
        } else {
          this.notificationService.showError(this.translate.instant('alert.value.not.found.display'));
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.notificationService.showError(this.translate.instant('alert.receiving.data'));
      }
    );
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.dataSource.data.map((t: any) => t.facilityAmount).reduce((acc: any, value: any) => acc + value, 0);
  }

  search() {
    if (this.registerPrimitiveRequestForm.valid) {
      this.customerDetailsService
        .getCustomerDetails(
          this.registerPrimitiveRequestForm.value['customerNumber'],
          this.registerPrimitiveRequestForm.value['customerType'].value
        )
        .subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.customerDetails = response.body;
            } else {
              this.notificationService.showError(this.translate.instant('alert.value.not.found.display'));
            }
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 400) {
              this.notificationService.showError(this.translate.instant('alert.existence.not.user'));
            } else {
              this.notificationService.showError(this.translate.instant('alert.receiving.data'));
            }
          }
        );
    }
  }

  viewCustomerDetails() {
    if (this.customerDetails) {
      const dialogRef = this.dialog.open(BranchRequestCustomerDetailsComponent, {
        width: 'auto',
        data: this.customerDetails,
      });

      dialogRef.afterClosed();
    }
  }

  assignValueToObject(selectMapModel: any) {
    FacilityInfoMockService.facilityInfoMockList.forEach((value) => {
      if (value.facilityNumber === selectMapModel.facilityNumber) {
        this.facilityInfoMockList = value;
      }
    });
  }

  viewFacilitiesCollateralInfo() {
    if (this.contractListForm.valid) {
      if (this.facilityInfoMockList.facilityCode) {
        const dialogRef = this.dialog.open(ViewContractDetailsComponent, {
          width: 'auto',
          data: this.facilityInfoMockList,
        });

        dialogRef.afterClosed();
      }
    }
  }

  addValueToTable() {
    if (this.contractListForm.valid) {
      let isExists = false;
      this.dataSource.data.forEach((data: FacilityInfoModel) => {
        if (data.contractId === this.facilityInfoMockList.contractId) {
          isExists = true;
        }
      });

      if (!isExists) {
        this.facilityInfoMockList.customerId = this.registerPrimitiveRequestForm.value['customerNumber'];
        this.facilityInfoMockList.customerCode = this.registerPrimitiveRequestForm.value['customerType'].value;
        this.dataSource.data.push(this.facilityInfoMockList);
        this.dataSource.filter = '';

        this.dataSource.data.forEach((value: FacilityInfoModel) => {
          if (!value.documentAttach) {
            value.documentAttach = [];

            this.paramDocumentList.forEach((param) => {
              const model = new CollateralDocumentModel();
              model.docSelect = param;
              value.documentAttach.push(model);
            });
          }
        });
      }
    }
  }

  viewTableDetails(facilityInfo: FacilityInfoModel) {
    const dialogRef = this.dialog.open(ViewContractDetailsComponent, {
      width: 'auto',
      data: facilityInfo,
    });

    dialogRef.afterClosed();
  }

  delete(facilityInfo: FacilityInfoModel) {
    const dialogRef = this.dialog.open(CommonDeleteComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response && response.includes('DELETE')) {
        var idd = -1;
        this.dataSource.filteredData.forEach((item: any, index: number) => {
          if (item.contractId === facilityInfo.contractId) {
            idd = index;
          }
        });
        this.dataSource.filteredData.splice(idd, 1);
        this.dataSource.filter = '';
      }
    });
  }

  openAddDocumentFileDialog(element: any) {
    const dialogRef = this.dialog.open(FileUploaderDocumentComponent, {
      width: 'auto',
      data: { dataSource: element, paramList: this.paramDocumentList },
    });

    dialogRef.afterClosed().subscribe((response) => {
      console.log(this.dataSource);
    });
  }

  openViewDocumentFileDialog(contractId: number) {
    this.initialRequestService.getDocumentAttachmentByContractId(contractId).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          if (response.body && response.body.length > 0) {
            let documentAttachment = new Array<CollateralDocumentModel>();
            response.body.forEach((attach: CollateralDocumentModel) => {
              this.paramDocumentList.forEach((param: ParamModel) => {
                if (attach && attach.docSelectCode == param.key) {
                  attach.docSelect = param;
                  attach.type = attach.fileSelectString.split(':')[1].split(';')[0];
                  documentAttachment.push(attach);
                }
              });
            });

            if (documentAttachment.length > 0) {
              const dialogRef = this.dialog.open(ViewDocumentAttachmentComponent, {
                width: 'auto',
                data: documentAttachment,
              });

              dialogRef.afterClosed();
            }
          } else {
            this.notificationService.showError(this.translate.instant('alert.value.not.found.display'));
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.notificationService.showError(this.translate.instant('alert.operation.failed'));
      }
    );
  }

  save() {
    if (this.dataSource.data.length > 0) {
      const vv = JSON.parse(JSON.stringify(this.dataSource.data));
      let iSub;
      let iParent;

      // Remove Not Assign File
      let parentLength = vv.length;
      for (iParent = 0; iParent < parentLength; iParent++) {
        for (iSub = 0; iSub < vv[iParent].documentAttach.length; iSub++) {
          if (vv[iParent].documentAttach[iSub]) {
            if (!vv[iParent].documentAttach[iSub].fileSelect) {
              vv[iParent].documentAttach.splice(iSub, 1);
            }
          }
        }
      }

      // Init File
      parentLength = vv.length;
      for (iParent = 0; iParent < parentLength; iParent++) {
        vv[iParent].actionDoneOnCollateral = this.detailsForm.value['actionsTakenOnCollateral'];
        vv[iParent].mobile = this.detailsForm.value['mobile'];
        vv[iParent].details = this.detailsForm.value['details'];

        for (iSub = 0; iSub < vv[iParent].documentAttach.length; iSub++) {
          if (vv[iParent].documentAttach[iSub]) {
            if (vv[iParent].documentAttach[iSub].fileSelect) {
              vv[iParent].documentAttach[iSub].docSelectCode = vv[iParent].documentAttach[iSub].docSelect.key;
              vv[iParent].documentAttach[iSub].fileSelectString = vv[iParent].documentAttach[iSub].fileSelect.src;
              delete vv[iParent].documentAttach[iSub].docSelect;
              delete vv[iParent].documentAttach[iSub].changeFile;
              delete vv[iParent].documentAttach[iSub].fileSelect;
            }
          }
        }
      }

      this.registerButtonDisable = true;
      this.initialRequestService.registerInitialRequestCollateral(vv).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.notificationService.showError(this.translate.instant('alert.operation.successful'));
          }
          this.disableForms();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.notificationService.showError(this.translate.instant('alert.operation.failed'));
          this.enableForms();
          this.registerButtonDisable = false;
        }
      );
    } else {
      this.notificationService.showError(this.translate.instant('alert.value.not.found.insert'));
    }
  }

  disableForms() {
    this.registerPrimitiveRequestForm.disable();
    this.contractListForm.disable();
    this.detailsForm.disable();
    this.disabledPage = true;
  }

  enableForms() {
    this.registerPrimitiveRequestForm.enable();
    this.contractListForm.enable();
    this.detailsForm.enable();
    this.disabledPage = false;
  }
}
