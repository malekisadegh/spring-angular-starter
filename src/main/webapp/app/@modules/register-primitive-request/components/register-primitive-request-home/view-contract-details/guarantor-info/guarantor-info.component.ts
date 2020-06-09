import { Component, OnInit, ViewChild } from '@angular/core';
import { GuarantorInfoModel } from '@shared/models/guarantors/guarantor-info.model';
import { PlaceAddressModel } from '@shared/models/guarantors/place-address.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guarantor-info',
  templateUrl: './guarantor-info.component.html',
  styleUrls: ['./guarantor-info.component.scss'],
})
export class GuarantorInfoComponent implements OnInit {
  guarantorInfoModel = new GuarantorInfoModel();

  @ViewChild(MatPaginator, { static: true }) paginatorWork: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortWork: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginatorLife: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortLife: MatSort;

  displayedColumnsWork: string[] = ['indexColumn', 'address', 'postalCode', 'phoneNumber'];
  dataSourceWork: any;

  displayedColumnsLife: string[] = ['indexColumn', 'address', 'postalCode', 'phoneNumber'];
  dataSourceLife: any;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.initModel();

    this.dataSourceWork = new MatTableDataSource<PlaceAddressModel>(this.guarantorInfoModel.workPlace);
    this.dataSourceWork.sort = this.sortWork;
    this.dataSourceWork.paginator = this.paginatorWork;
    this.paginatorWork._intl.itemsPerPageLabel = this.translate.instant('table.items.per.page');

    this.dataSourceLife = new MatTableDataSource<PlaceAddressModel>(this.guarantorInfoModel.lifePlace);
    this.dataSourceLife.sort = this.sortLife;
    this.dataSourceLife.paginator = this.paginatorLife;
    this.paginatorLife._intl.itemsPerPageLabel = this.translate.instant('table.items.per.page');
  }

  initModel() {
    this.guarantorInfoModel.customerId = '1111111111';
    this.guarantorInfoModel.fullName = 'ایمان خسروانی';
    this.guarantorInfoModel.mobile = '09123456789';

    let life = new PlaceAddressModel();
    life.id = 1;
    life.phone = '02112345678';
    life.address = 'تهران خیابان نوفل لوشاتو پلاک ۱۱';
    life.postalCode = '1234567890';

    this.guarantorInfoModel.lifePlace = [life];

    let work = new PlaceAddressModel();
    work.id = 1;
    work.phone = '09351234567';
    work.address = 'تهران خیابان پاستور کوچه جهاد پلاک ۱۱';
    work.postalCode = '9876543210';

    this.guarantorInfoModel.workPlace = [work];
  }
}
