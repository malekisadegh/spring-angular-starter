import { NgModule } from '@angular/core';
import { SimpleRequestRoutingModule } from '@modules/simple-request/simple-request-routing.module';
import { MatInputModule } from '@angular/material/input';
import { SimpleRequestHomeComponent } from '@modules/simple-request/components/simple-request-home/simple-request-home.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NgxMaskModule } from 'ngx-mask';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPrintModule } from 'ngx-print';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ShowResponseCodeComponent } from './components/simple-request-home/show-response-code/show-response-code.component';

@NgModule({
  declarations: [SimpleRequestHomeComponent, ShowResponseCodeComponent],
  imports: [
    SimpleRequestRoutingModule,
    MatInputModule,
    SharedModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    NgxMaskModule,
    MatPaginatorModule,
    NgxPrintModule,
    MatAutocompleteModule,
    MatDatepickerModule,
  ],
})
export class SimpleRequestModule {}
