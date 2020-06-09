import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  public readonly TIME_STAMP_FORMAT_WITHOUT_T = 'YYYY-MM-DD HH:mm:ss';
  public readonly TIME_STAMP_FORMAT_WITH_T = "YYYY-MM-DD'T'HH:mm:ss";

  public convertStringDate(dateString: string): string {
    if (dateString) {
      dateString = dateString.trim();
      if (dateString && dateString.length === 6) {
        return dateString.substring(0, 2) + '/' + dateString.substring(2, 4) + '/' + dateString.substring(4, 6);
      }
    }

    return null;
  }
}
