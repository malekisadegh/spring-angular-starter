import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replace' })
export class ReplacePipe implements PipeTransform {
  transform(value: string, replaceRgx: string, replaceValue: string): string {
    return value.replace(new RegExp(replaceRgx, 'g'), replaceValue);
  }
}
