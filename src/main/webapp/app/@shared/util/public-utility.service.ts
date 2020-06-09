import { Injectable } from '@angular/core';

@Injectable()
export class PublicUtilityService {
  public static readonly PARAM_DOC_TYPE = -6;

  public static convertArabicToPersian(arabic: string): string {
    return arabic.replace(/\u0643/g, '\u06A9').replace(/\u064A/g, '\u06CC');
  }
}
