import { Component, OnInit, ViewChild } from '@angular/core';
import { GivingDeadlineModel } from '@shared/models/deadline/giving-deadline.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InquiryRequestModel } from '@shared/models/inquiry-request/inquiry-request.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-giving-deadline',
  templateUrl: './giving-deadline.component.html',
  styleUrls: ['./giving-deadline.component.scss'],
})
export class GivingDeadlineComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  divingDeadLineModelList: GivingDeadlineModel[] = [
    {
      deadlineAmount: '100000',
      deadlineInterestRate: '18',
      deadlinePenaltyRate: '12542535',
      deadlineOriginalAmount: '50000000',
      deadlineProfitAmount: '800000',
      deadlinePenaltyAmount: '800000',
      deadlineAdvancedReceivedAmount: '400000',
      deadlineAdvancedReceivedPercent: '21',
    },
    {
      deadlineAmount: '200000',
      deadlineInterestRate: '18',
      deadlinePenaltyRate: '98542535',
      deadlineOriginalAmount: '60000000',
      deadlineProfitAmount: '900000',
      deadlinePenaltyAmount: '900000',
      deadlineAdvancedReceivedAmount: '900000',
      deadlineAdvancedReceivedPercent: '21',
    },
  ];

  dataSource: any;
  displayedColumns: string[] = [
    'deadlineAmount',
    'deadlineInterestRate',
    'deadlinePenaltyRate',
    'deadlineOriginalAmount',
    'deadlineProfitAmount',
    'deadlinePenaltyAmount',
    'deadlineAdvancedReceivedAmount',
    'deadlineAdvancedReceivedPercent',
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<GivingDeadlineModel>(this.divingDeadLineModelList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator._intl.itemsPerPageLabel = this.translate.instant('table.items.per.page');
  }
}
