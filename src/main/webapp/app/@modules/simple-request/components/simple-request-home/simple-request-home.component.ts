import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectMapModel } from '@shared/models/public/select-map.model';
import { StaticValueService } from '@shared/util/static-value.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CustomerDetailsService } from '@core/services/customer/customer-details.service';
import { CustomerDetailsModel } from '@shared/models/customer-details/customer-details.model';
import { NotificationService } from '@core/services/notification.service';
import { BranchRequestCustomerDetailsComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/customer-details/branch-request-customer-details.component';
import { MatDialog } from '@angular/material/dialog';
import { FacilityInfoModel } from '@shared/models/mock/facility-info.model';
import { CommonDeleteComponent } from '@modules/register-primitive-request/components/common-delete/common-delete.component';
import { FileUploaderDocumentComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/file-uploader-document/file-uploader-document.component';
import { ParamModel } from '@shared/models/public/param.model';
import { ParamService } from '@core/services/param.service';
import { PublicUtilityService } from '@shared/util/public-utility.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { CollateralDocumentModel } from '@shared/models/collateral/collateral-document.model';
import { InitialRequestService } from '@core/services/request/initial-request.service';
import { ViewDocumentAttachmentComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/view-document-attachment/view-document-attachment.component';
import * as printJS from 'print-js';
import { AccountInfoModel } from '@shared/models/customer-details/account-info.model';
import { DateTimeService } from '@core/services/local/date-time.service';
import { Observable } from 'rxjs';
import { EconomicSectionModel } from '@shared/models/collateral/economic-section.model';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { DrlRequestModel } from '@shared/models/simple-request/drl-request.model';
import { DrlRequestContractInfoListModel } from '@shared/models/simple-request/drl-request-contract-info-list.model';
import { ShowResponseCodeComponent } from '@modules/simple-request/components/simple-request-home/show-response-code/show-response-code.component';
import { PropertiesService } from '@core/services/local/properties.service';

@Component({
  selector: 'app-simple-request-home',
  templateUrl: './simple-request-home.component.html',
  styleUrls: ['./simple-request-home.component.scss'],
})
export class SimpleRequestHomeComponent implements OnInit {
  componentTitle = 'simple-request';

  customerNumberLabel: string;

  simpleRequestForm: FormGroup;
  detailsForm: FormGroup;

  registerButtonDisable = false;
  disabledPage = false;
  totalRequestAmount: number;

  customerTypeList: SelectMapModel[];
  customerDetails: CustomerDetailsModel;

  paramDocumentList: ParamModel[];
  accountList: AccountInfoModel[];

  isicMainEconomicCodeList = new Array<EconomicSectionModel>();
  isicActivityTypeCodeList = new Array<EconomicSectionModel>();
  isicActivityFieldCodeList = new Array<EconomicSectionModel>();

  filteredOptionsMainEconomic: Observable<EconomicSectionModel[]>;
  filteredOptionsActivityType: Observable<EconomicSectionModel[]>;
  filteredOptionsActivityField: Observable<EconomicSectionModel[]>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  displayedColumns: string[] = [
    'contractNumber',
    'contractType',
    'originalAmountContract',
    'interestRateStatedContract',
    'debtRemaining',
    'remainingDebtBasedPrinciple',
    'remainingDebtBasedProfit',
    'remainingDebtBasedCommitment',
    'recordFrequencyDelays',
    'details',
  ];

  constructor(
    private customerDetailsService: CustomerDetailsService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private paramService: ParamService,
    private translate: TranslateService,
    private properties: PropertiesService,
    private initialRequestService: InitialRequestService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit() {
    // Related with customerType In simpleRequestForm Form
    this.customerNumberLabel = this.translate.instant('label.public.national.code.real');

    this.customerTypeList = StaticValueService.customerTypeList;

    this.simpleRequestForm = new FormGroup({
      customerType: new FormControl(StaticValueService.customerTypeList[0], [Validators.required]),
      customerNumber: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      customerName: new FormControl({ value: null, disabled: true }),

      paramEconomicSector: new FormControl(null, [Validators.required]),
      paramSubEconomicSector: new FormControl(null, [Validators.required]),
      paramSubISICSector: new FormControl(null, [Validators.required]),

      contractNumber: new FormControl(null, [Validators.required]),
      contractOriginalAmount: new FormControl(null, [Validators.required]),
      initialContractAmount: new FormControl(null, [Validators.required]),
      initialContractRate: new FormControl(null, [Validators.required]),

      installmentNumber: new FormControl(null, [Validators.required]),
      paymentDeadLinePerMonth: new FormControl(null, [Validators.required]),
      jarRemainAmntExtra: new FormControl(null, [Validators.required]),

      accountSelected: new FormControl(null, [Validators.required]),
      accountSelectedType: new FormControl({ value: null, disabled: true }),
      accountSelectedOpenDate: new FormControl({ value: null, disabled: true }),
      contractType: new FormControl(null, [Validators.required]),
      remainingDebt: new FormControl(null, [Validators.required]),

      intrstRemainAmnt: new FormControl(null, [Validators.required]),
      jarRemainAmntIntrstRate: new FormControl(null, [Validators.required]),

      delayRecordFrequency: new FormControl(null, [Validators.required]),
      remainingDebtBasedPrinciple: new FormControl(null, [Validators.required]),
      remainingDebtBasedProfit: new FormControl(null, [Validators.required]),
      remainingDebtBasedCommitment: new FormControl(null, [Validators.required]),
      grantedDate: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
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

    this.paramService.findEconomicSection(0, null).subscribe((response) => {
      this.isicMainEconomicCodeList = response.body;
      this.filteredOptionsMainEconomic = this.simpleRequestForm.controls['paramEconomicSector'].valueChanges
        .startWith(null)
        .map((value: any) => this._filterOne(value));
    });

    this.simpleRequestForm.get('customerNumber').valueChanges.subscribe((response: any) => {
      this.getUserDetails();
    });
    this.simpleRequestForm.get('customerType').valueChanges.subscribe((response: any) => {
      this.getUserDetails();
    });
  }

  _filterOne(val: any): EconomicSectionModel[] {
    let realval = val && typeof val === 'object' ? val.title : val;
    let result = [];
    let lastOption = null;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.isicMainEconomicCodeList.length; i++) {
      if (
        !realval ||
        PublicUtilityService.convertArabicToPersian(this.isicMainEconomicCodeList[i].title).startsWith(realval)
      ) {
        if (this.isicMainEconomicCodeList[i].title !== lastOption) {
          lastOption = this.isicMainEconomicCodeList[i].title;
          result.push(this.isicMainEconomicCodeList[i]);
        }
      }
    }
    return result;
  }

  displayFnOne(value: any): string {
    return value && typeof value === 'object' ? value.title : value;
  }

  changeOne() {
    this.paramService
      .findEconomicSection(1, this.simpleRequestForm.value['paramEconomicSector'].id)
      .subscribe((response) => {
        this.isicActivityTypeCodeList = response.body;
        this.filteredOptionsActivityType = this.simpleRequestForm.controls['paramSubEconomicSector'].valueChanges
          .startWith(null)
          .map((value: any) => this._filterTwo(value));
      });
  }

  _filterTwo(val: any): EconomicSectionModel[] {
    let realvalTwo = val && typeof val === 'object' ? val.title : val;
    let resultTwo = [];
    let lastOptionTwo = null;
    for (let i = 0; i < this.isicActivityTypeCodeList.length; i++) {
      if (
        !realvalTwo ||
        PublicUtilityService.convertArabicToPersian(this.isicActivityTypeCodeList[i].title).startsWith(realvalTwo)
      ) {
        if (this.isicActivityTypeCodeList[i].title !== lastOptionTwo) {
          lastOptionTwo = this.isicActivityTypeCodeList[i].title;
          resultTwo.push(this.isicActivityTypeCodeList[i]);
        }
      }
    }
    return resultTwo;
  }

  displayFnTwo(value: any): string {
    return value && typeof value === 'object' ? value.title : value;
  }

  changeTwo() {
    this.paramService
      .findEconomicSection(2, this.simpleRequestForm.value['paramSubEconomicSector'].id)
      .subscribe((response: HttpResponse<any>) => {
        this.isicActivityFieldCodeList = response.body;
        this.filteredOptionsActivityField = this.simpleRequestForm.controls['paramSubISICSector'].valueChanges
          .startWith(null)
          .map((value: any) => this._filterThee(value));
      });
  }

  _filterThee(val: any): EconomicSectionModel[] {
    let realvalThree = val && typeof val === 'object' ? val.title : val;
    let resultThree = [];
    let lastOptionThree = null;
    for (let i = 0; i < this.isicActivityFieldCodeList.length; i++) {
      if (
        !realvalThree ||
        PublicUtilityService.convertArabicToPersian(this.isicActivityFieldCodeList[i].title).startsWith(realvalThree)
      ) {
        if (this.isicActivityFieldCodeList[i].title !== lastOptionThree) {
          lastOptionThree = this.isicActivityFieldCodeList[i].title;
          resultThree.push(this.isicActivityFieldCodeList[i]);
        }
      }
    }

    return resultThree;
  }

  displayFnThee(value: any): string {
    return value && typeof value === 'object' ? value.title : value;
  }

  changeThee() {
    // this.paramService.findEconomicSection(1,
    // this.branchRequestSearchViewForm.value['paramEconomicSector'].id).subscribe(
    //   (response) => {
    //     this.isicCodeList = response.body;
    //     this.filteredOptionsMainEconomic = this.branchRequestSearchViewForm.controls['paramEconomicSector'].valueChanges
    //       .startWith(null)
    //       .map(value => this._filterTwo(value));
    //   },
    // );
  }

  customerNumberLabelFn() {
    if (
      this.simpleRequestForm.get('customerType').value &&
      this.simpleRequestForm.get('customerType').value.value === '1'
    ) {
      this.customerNumberLabel = this.translate.instant('label.public.national.code.real');
    } else {
      this.customerNumberLabel = this.translate.instant('label.public.national.code.legal');
    }
  }

  getUserDetails() {
    if (this.simpleRequestForm.get('customerNumber').valid && this.simpleRequestForm.get('customerType').valid) {
      this.customerDetailsService
        .getCustomerDetails(
          this.simpleRequestForm.get('customerNumber').value,
          this.simpleRequestForm.get('customerType').value.value
        )
        .subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.customerDetails = response.body;
              this.simpleRequestForm.patchValue({
                customerName:
                  this.customerDetails.customerTypeCode === '01'
                    ? this.customerDetails.firstName + ' ' + this.customerDetails.lastName
                    : this.customerDetails.lastName,
              });
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

      this.customerDetailsService.fetchAccountInfo(this.simpleRequestForm.get('customerNumber').value).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.accountList = response.body;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  showSomeDetailsOfAccount(id: any) {
    const val = this.accountList.filter((value: any) => {
      return value && value.id === id ? value : null;
    });

    this.simpleRequestForm.patchValue({
      accountSelectedType: val[0].customerType,
      accountSelectedOpenDate: this.dateTimeService.convertStringDate(val[0].openDate),
    });
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

  addValueToTable() {
    if (this.simpleRequestForm.valid) {
      const facilityInfoModel = new FacilityInfoModel();
      facilityInfoModel.contractId = this.simpleRequestForm.value['contractNumber'];
      facilityInfoModel.facilityAmount = this.simpleRequestForm.value['contractOriginalAmount'];
      facilityInfoModel.contractRateAmount = this.simpleRequestForm.value['initialContractAmount'];
      facilityInfoModel.contractRateInterest = this.simpleRequestForm.value['initialContractRate'];

      facilityInfoModel.installmentNumber = this.simpleRequestForm.value['installmentNumber'];
      facilityInfoModel.paymentDeadLinePerMonth = this.simpleRequestForm.value['paymentDeadLinePerMonth'];

      facilityInfoModel.deferred = this.simpleRequestForm.value['remainingDebt'];
      facilityInfoModel.deadLineNumber = this.simpleRequestForm.value['delayRecordFrequency'];
      facilityInfoModel.contractType = this.simpleRequestForm.value['contractType'];
      facilityInfoModel.remainingDebtBasedPrinciple = this.simpleRequestForm.value['remainingDebtBasedPrinciple'];
      facilityInfoModel.remainingDebtBasedProfit = this.simpleRequestForm.value['remainingDebtBasedProfit'];
      facilityInfoModel.remainingDebtBasedCommitment = this.simpleRequestForm.value['remainingDebtBasedCommitment'];

      facilityInfoModel.intrstRemainAmnt = this.simpleRequestForm.value['intrstRemainAmnt'];
      facilityInfoModel.jarRemainAmntIntrstRate = this.simpleRequestForm.value['jarRemainAmntIntrstRate'];
      facilityInfoModel.jarRemainAmntExtra = this.simpleRequestForm.value['jarRemainAmntExtra'];

      facilityInfoModel.mainEconomicPart = this.simpleRequestForm.value['paramEconomicSector'].id;
      facilityInfoModel.isicEconomicPart = this.simpleRequestForm.value['paramSubEconomicSector'].id;
      facilityInfoModel.isicSubEconomicPart = this.simpleRequestForm.value['paramSubISICSector'].id;

      facilityInfoModel.grantedDate = this.simpleRequestForm.value['grantedDate'].format('yyyyMMDD');
      facilityInfoModel.description = this.simpleRequestForm.value['description'];

      let isExists = false;
      this.dataSource.data.forEach((data: FacilityInfoModel) => {
        if (data.contractId === facilityInfoModel.contractId) {
          isExists = true;
        }
      });

      if (!isExists) {
        facilityInfoModel.customerId = this.simpleRequestForm.value['customerNumber'];
        facilityInfoModel.customerCode = this.simpleRequestForm.value['customerType'].value;
        this.dataSource.data.push(facilityInfoModel);
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
    } else {
      // For Show Error
      this.simpleRequestForm.markAllAsTouched();
    }
  }

  resetSimpleForm() {
    this.simpleRequestForm.reset();
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    // return this.dataSource.data.map((t: any) => t.facilityAmount).reduce((acc: any, value: any) => acc + value, 0);

    if (this.dataSource.data.length > 0) {
      let money = 0;
      this.dataSource.data.forEach((value: FacilityInfoModel) => {
        money += Number(value.facilityAmount);
      });

      this.totalRequestAmount = money;
      return money;
    }
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
      this.initialRequestService.registerInitialRequestCollateral(this.castToDrlRequestModel(vv)).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            const dialogRef = this.dialog.open(ShowResponseCodeComponent, {
              width: 'auto',
              direction: 'rtl',
              data: response.body,
            });

            dialogRef.afterClosed();
          }
          this.disableForms();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.notificationService.showError(this.translate.instant('alert.operation.failed'));
          this.registerButtonDisable = false;
          this.enableForms();
        }
      );
    } else {
      this.notificationService.showError(this.translate.instant('alert.value.not.found.insert'));
    }
  }

  disableForms() {
    this.simpleRequestForm.disable();
    this.detailsForm.disable();
    this.disabledPage = true;
  }

  enableForms() {
    this.simpleRequestForm.enable();
    this.detailsForm.enable();
    this.disabledPage = false;
  }

  printJS() {
    printJS({
      printable: 'print',
      type: 'html',
      documentTitle: 'Test',
      maxWidth: 800,
      targetStyles: '*',
      style: '@page { size: A4;}',
      ignoreElements: ['AddButton', 'pageviewButton', 'deleteButton', 'insert_drive_fileButton', 'image_searchButton'],
    });
  }

  @ViewChild('myDiv') myDiv: ElementRef;

  printTest() {
    let myWindow = window.open();

    myWindow.document.write(
      '<html><head>' +
        '<style>' +
        'body{' +
        '   font-family: vazir !important; ' +
        '   direction: rtl' +
        '}' +
        'table, th, td {\n' +
        '    border: 1px solid black;\n' +
        '    font-size: medium;\n' +
        '  }\n' +
        '\n' +
        '  table {\n' +
        '    border-collapse: collapse;\n' +
        '    width: 100%;\n' +
        '  }\n' +
        '\n' +
        '  td, th {\n' +
        '    border: 1px solid #dddddd;\n' +
        '    text-align: right;\n' +
        '    padding: 8px;\n' +
        '  }\n' +
        '\n' +
        '  tr:nth-child(even) {\n' +
        '    background-color: #dddddd;\n' +
        '' +
        '}</style>' +
        '<title>' +
        'فرم ثبت درخواست ' +
        '</title>'
    );
    myWindow.document.write('</head><body>');

    myWindow.document.write('<div align="left">شماره: </div>');

    myWindow.document.write('<h1>' + 'ثبت درخواست اولیه' + '</h1>');

    myWindow.document.write('<table style="width:100%">');
    myWindow.document.write('<tr>');
    myWindow.document.write('    <th>' + this.translate.instant('label.contract.number') + '</th>');
    myWindow.document.write('    <th>' + this.translate.instant('label.contract.type.other') + '</th>');
    myWindow.document.write('    <th>' + this.translate.instant('label.contract.original.amount') + '</th>');
    myWindow.document.write('    <th>' + this.translate.instant('label.contract.rate.interest.state') + '</th>');
    myWindow.document.write('    <th>' + this.translate.instant('label.remaining.debt') + '</th>');
    myWindow.document.write('    <th>' + this.translate.instant('label.delay.record.frequency') + '</th>');
    myWindow.document.write('    <th>' + this.translate.instant('label.customer.national.id') + '</th>');
    myWindow.document.write('    <th>' + this.translate.instant('label.public.full.name.company') + '</th>');
    myWindow.document.write('</tr>');

    if (this.dataSource.data.length > 0) {
      this.dataSource.data.forEach((value: FacilityInfoModel) => {
        myWindow.document.write('<tr>');
        let te = Number(value.contractId) ? value.contractId.toString() : '';
        myWindow.document.write(' <td style="word-break: break-all;">' + te + '</td>');

        te = value.contractType ? value.contractType : '';
        myWindow.document.write(' <td style="word-break: break-all;">' + te + '</td>');

        te = Number(value.facilityAmount) ? value.facilityAmount.toString() : '';
        myWindow.document.write(' <td style="word-break: break-all;">' + te + '</td>');

        te = Number(value.contractRateInterest) ? value.contractRateInterest.toString() : '';
        myWindow.document.write(' <td style="word-break: break-all;">' + te + '</td>');

        te = Number(value.deferred) ? value.deferred.toString() : '';
        myWindow.document.write(' <td style="word-break: break-all;">' + te + '</td>');

        te = Number(value.deadLineNumber) ? value.deadLineNumber.toString() : '';
        myWindow.document.write(' <td style="word-break: break-all;">' + te + '</td>');
        myWindow.document.write(' <td style="word-break: break-all;">' + value.customerId + '</td>');
        myWindow.document.write(' <td>' + this.simpleRequestForm.get('customerName').value + '</td>');
        myWindow.document.write('</tr>');
        console.log('');
      });
    }
    myWindow.document.write('</table>');

    myWindow.document.write('<br/>');

    let fe = this.detailsForm.get('actionsTakenOnCollateral').value
      ? this.detailsForm.get('actionsTakenOnCollateral').value
      : '';
    myWindow.document.write(
      '<label for="actionsTakenOnCollateral">' +
        this.translate.instant('label.collateral.action.taken') +
        '</label><br/>' +
        '<p id="actionsTakenOnCollateral" style="word-break: break-all; width: 80%;">' +
        fe +
        '</p><br/><br/><br/>'
    );

    fe = this.detailsForm.get('mobile').value ? this.detailsForm.get('mobile').value : '';
    myWindow.document.write(
      '<label for="mobile">' +
        this.translate.instant('label.public.mobile') +
        '</label><br/>' +
        '<input type="text" id="mobile" style="border: none;" value="' +
        fe +
        '"><br/><br/><br/><br/>'
    );

    fe = this.detailsForm.get('details').value ? this.detailsForm.get('details').value : '';
    myWindow.document.write(
      '<label for="details">' +
        this.translate.instant('label.details') +
        '</label><br/>' +
        '<p id="details" style="word-break: break-all; width: 80%;">' +
        fe +
        '</p><br/><br/><br/>'
    );

    myWindow.document.write('</body></html>');

    myWindow.document.close();

    myWindow.print();
    setTimeout(() => myWindow.close(), 1000);
    return false;
  }

  castToDrlRequestModel(facilityList: FacilityInfoModel[]) {
    let drlRequest = new DrlRequestModel();

    drlRequest.userId = this.properties.data.userId;
    drlRequest.unitId = this.properties.data.unitId;

    drlRequest.customerType =
      this.simpleRequestForm.get('customerType').value && this.simpleRequestForm.get('customerType').value.value === '1'
        ? 'REAL'
        : 'LEGAL';

    this.simpleRequestForm.get('customerType').value && this.simpleRequestForm.get('customerType').value.value === '1'
      ? (drlRequest.cifNationalCode = this.simpleRequestForm.get('customerNumber').value)
      : (drlRequest.agentNationalCode = this.simpleRequestForm.get('customerNumber').value);

    drlRequest.depositNumber = this.simpleRequestForm.get('accountSelected').value;
    drlRequest.totalRequestAmount = this.totalRequestAmount;

    drlRequest.mainEconomicPart = this.simpleRequestForm.value['paramEconomicSector'].id;
    drlRequest.isicEconomicPart = this.simpleRequestForm.value['paramSubEconomicSector'].id;
    drlRequest.isicSubEconomicPart = this.simpleRequestForm.value['paramSubISICSector'].id;

    drlRequest.description = this.detailsForm.value['details'];
    drlRequest.actionId = StaticValueService.ACTION_ID_PAGE_SIMPLE_REQUEST;
    drlRequest.status = StaticValueService.STATUS_PAGE_SIMPLE_REQUEST;

    drlRequest.drlRequestContractInfoDTOList = [];
    facilityList.forEach((facility: FacilityInfoModel) => {
      let drlRequestContractInfo = new DrlRequestContractInfoListModel();

      drlRequestContractInfo.userId = this.properties.data.userId;
      drlRequestContractInfo.unitId = this.properties.data.unitId;

      drlRequestContractInfo.contractNumber = facility.contractId.toString();
      drlRequestContractInfo.mainEconomicPart = facility.mainEconomicPart.id;
      drlRequestContractInfo.isicEconomicPart = facility.isicEconomicPart.id;
      drlRequestContractInfo.contractTypeDsc = facility.contractType;
      drlRequestContractInfo.pureAmount = facility.facilityAmount;
      drlRequestContractInfo.intrstAmnt = facility.contractRateAmount;
      drlRequestContractInfo.intrstRate = facility.contractRateInterest;
      drlRequestContractInfo.etaDate = facility.grantedDate;

      drlRequestContractInfo.gstCnt = facility.installmentNumber;
      drlRequestContractInfo.gstSpace = facility.paymentDeadLinePerMonth;

      drlRequestContractInfo.totalRemainAmnt = facility.deferred;
      drlRequestContractInfo.pureRemainAmnt = facility.remainingDebtBasedPrinciple;
      drlRequestContractInfo.intrstRemainAmnt = facility.intrstRemainAmnt;
      drlRequestContractInfo.totalJarRemainAmnt = facility.remainingDebtBasedProfit;
      drlRequestContractInfo.jarRemainAmntIntrstRate = facility.jarRemainAmntIntrstRate;
      drlRequestContractInfo.jarRemainAmntExtra = facility.jarRemainAmntExtra;
      drlRequestContractInfo.costRemainAmnt = facility.deferred;
      drlRequestContractInfo.emhalCnt = facility.deadLineNumber;
      drlRequestContractInfo.description = facility.description;

      drlRequest.drlRequestContractInfoDTOList.push(drlRequestContractInfo);
    });

    return drlRequest;
  }
}
