import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectMapModel } from '@shared/models/public/select-map.model';
import { MatSort } from '@angular/material/sort';
import { InquiryRequestModel } from '@shared/models/inquiry-request/inquiry-request.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inquiry-request-home',
  templateUrl: './inquiry-request-home.component.html',
  styleUrls: ['./inquiry-request-home.component.scss'],
})
export class InquiryRequestHomeComponent implements OnInit {
  componentTitle = 'inquiry-request';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  inquiryRequestMainForm: FormGroup;

  statusList: SelectMapModel[] = [
    { value: '1', nameValue: 'همه وضعیت ها' },
    { value: '2', nameValue: 'ثبت اولیه' },
    { value: '3', nameValue: 'ثبت نهایی' },
    { value: '4', nameValue: 'ویرایش شده' },
    { value: '5', nameValue: 'حذف شده' },
  ];

  dataSource: any;
  displayedColumns: string[] = [
    'trackingCode',
    'contractNumber',
    'customerName',
    'requestDate',
    'customerRegisterCodeName',
    'unitRegisterNameCode',
    'function',
  ];

  mockModel: InquiryRequestModel[] = [
    {
      trackingCode: '123456',
      contractNumber: '100200300400',
      customerName: 'آذر سهند',
      requestDate: '1399/02/25',
      customerRegisterCodeName: 'حسین یزدانی - 100',
      unitRegisterNameCode: 'شعبه مرکزی - 60',
    },
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.inquiryRequestMainForm = new FormGroup({
      fromDate: new FormControl(null),
      toDate: new FormControl(null),
      status: new FormControl(null),
      customerId: new FormControl(null),
    });

    this.dataSource = new MatTableDataSource<InquiryRequestModel>(this.mockModel);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator._intl.itemsPerPageLabel = this.translate.instant('table.items.per.page');
  }

  search() {}
}
