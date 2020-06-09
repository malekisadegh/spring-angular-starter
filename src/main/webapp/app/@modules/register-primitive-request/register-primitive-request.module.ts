import { NgModule } from '@angular/core';
import { RegisterPrimitiveRequestHomeComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/register-primitive-request-home.component';
import { RegisterPrimitiveRequestRoutingModule } from '@modules/register-primitive-request/register-primitive-request-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BranchRequestCustomerDetailsComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/customer-details/branch-request-customer-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewContractDetailsComponent } from './components/register-primitive-request-home/view-contract-details/view-contract-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FacilitiesCollateralInfoComponent } from './components/register-primitive-request-home/view-contract-details/facilities-collateral-info/facilities-collateral-info.component';
import { ContractCollateralInfoComponent } from './components/register-primitive-request-home/view-contract-details/contract-collateral-info/contract-collateral-info.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskModule } from 'ngx-mask';
import { FloorNonCurrentRemainingComponent } from './components/register-primitive-request-home/view-contract-details/floor-non-current-remins/floor-non-current-remaining.component';
import { GivingDeadlineComponent } from './components/register-primitive-request-home/view-contract-details/giving-deadline/giving-deadline.component';
import { GuarantorInfoComponent } from './components/register-primitive-request-home/view-contract-details/guarantor-info/guarantor-info.component';
import { ViewOtherDetailsComponent } from './components/register-primitive-request-home/view-other-details/view-other-details.component';
import { CommonDeleteComponent } from '@modules/register-primitive-request/components/common-delete/common-delete.component';
import { FileUploaderDocumentComponent } from './components/register-primitive-request-home/file-uploader-document/file-uploader-document.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewDocumentAttachmentComponent } from './components/register-primitive-request-home/view-document-attachment/view-document-attachment.component';
import { ViewFileComponent } from './components/register-primitive-request-home/view-document-attachment/view-file/view-file.component';

@NgModule({
  declarations: [
    RegisterPrimitiveRequestHomeComponent,
    BranchRequestCustomerDetailsComponent,
    ViewContractDetailsComponent,
    FacilitiesCollateralInfoComponent,
    ContractCollateralInfoComponent,
    FloorNonCurrentRemainingComponent,
    GivingDeadlineComponent,
    GuarantorInfoComponent,
    ViewOtherDetailsComponent,
    CommonDeleteComponent,
    FileUploaderDocumentComponent,
    ViewDocumentAttachmentComponent,
    ViewFileComponent,
  ],
  imports: [
    RegisterPrimitiveRequestRoutingModule,
    SharedModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgxMaskModule,
    MatTooltipModule,
  ],
  exports: [RegisterPrimitiveRequestHomeComponent, ViewContractDetailsComponent],
})
export class RegisterPrimitiveRequestModule {}
