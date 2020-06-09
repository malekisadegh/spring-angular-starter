import { PlaceAddressModel } from './place-address.model';

export class GuarantorInfoModel {
  /**
   * کد ملی / شناسه ملی
   */
  customerId: string;
  /**
   * شماره همراه
   */
  mobile: string;
  /**
   * نام و نام خانوادگی
   */
  fullName: string;

  workPlace: PlaceAddressModel[];
  lifePlace: PlaceAddressModel[];
}
