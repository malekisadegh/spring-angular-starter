import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { RegisterPrimitiveRequestHomeComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/register-primitive-request-home.component';
import { extract } from '@app/i18n';
import { NgModule } from '@angular/core';
import { InquiryRequestHomeComponent } from '@modules/inquiry-request/components/inquiry-request-home/inquiry-request-home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'inquiry-request',
      component: InquiryRequestHomeComponent,
      data: { title: extract('inquiry-request') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class InquiryRequestRoutingModule {}
