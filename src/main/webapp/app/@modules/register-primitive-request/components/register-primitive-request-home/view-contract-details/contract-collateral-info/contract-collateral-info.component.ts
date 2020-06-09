import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FacilityInfoModel } from '@shared/models/mock/facility-info.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contract-collateral-info',
  templateUrl: './contract-collateral-info.component.html',
  styleUrls: ['./contract-collateral-info.component.scss'],
})
export class ContractCollateralInfoComponent implements OnInit {
  @Input('facilityInfoMockModel') facilityInfoMockModel: FacilityInfoModel;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['indexColumn', 'collateralCode', 'collateralName', 'collateralPercent'];
  dataSource: any;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<FacilityInfoModel>([this.facilityInfoMockModel]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = this.translate.instant('table.items.per.page');
  }
}
