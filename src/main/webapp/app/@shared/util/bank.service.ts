import { Injectable } from '@angular/core';
import { SelectKeyModel } from '@shared/models/public/select-key.model';

@Injectable()
export class BankService {
  bankList: SelectKeyModel[] = [
    { key: 10, value: 'بانک مرکزی' },
    { key: 11, value: 'بانک صنعت و معدن' },
    { key: 12, value: 'بانک ملت' },
    { key: 13, value: 'بانک رفاه' },
    { key: 14, value: 'بانک مسکن' },
    { key: 15, value: 'بانک سپه' },
    { key: 16, value: 'بانک کشاورزی' },
    { key: 17, value: 'بانک ملی ایران' },
    { key: 18, value: 'بانک تجارت' },
    { key: 19, value: 'بانک صادرات ایران' },
    { key: 20, value: 'بانک توسعه صادرات' },
    { key: 21, value: 'پست بانک ایران' },
    { key: 22, value: 'بانک توسعه تعاون' },
    { key: 51, value: 'موسسه اعتباری توسعه' },
    { key: 53, value: 'بانک کارآفرین' },
    { key: 54, value: 'بانک پارسیان' },
    { key: 55, value: 'بانک اقتصاد نوین' },
    { key: 56, value: 'بانک سامان' },
    { key: 57, value: 'بانک پاسارگاد' },
    { key: 58, value: 'بانک سرمایه' },
    { key: 59, value: 'بانک سینا' },
    { key: 60, value: 'قرض الحسنه مهر ایران' },
    { key: 61, value: 'بانک شهر' },
  ];

  public getBankName(bankCode: number): string {
    if (bankCode) {
      let i;
      for (i = 0; i < this.bankList.length; i++) {
        if (this.bankList[i].key.toString() === bankCode.toString()) {
          return this.bankList[i].value;
        }
      }
    }
    return '';
  }
}
