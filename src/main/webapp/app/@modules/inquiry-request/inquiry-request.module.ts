import { NgModule } from '@angular/core';
import { InquiryRequestHomeComponent } from '@modules/inquiry-request/components/inquiry-request-home/inquiry-request-home.component';
import { InquiryRequestRoutingModule } from '@modules/inquiry-request/inquiry-request-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [InquiryRequestHomeComponent],
  imports: [
    InquiryRequestRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  exports: [InquiryRequestHomeComponent],
})
export class InquiryRequestModule {}
