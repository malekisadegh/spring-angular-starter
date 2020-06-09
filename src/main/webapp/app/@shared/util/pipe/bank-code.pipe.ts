import { Pipe, PipeTransform } from '@angular/core';
import { BankService } from '@shared/util/bank.service';

@Pipe({ name: 'bankCode' })
export class BankCodePipe implements PipeTransform {
  constructor(private bankService: BankService) {}

  transform(bankCode: number): string {
    return this.bankService.getBankName(bankCode);
  }
}
