import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';
import { NgModule } from '@angular/core';
import { RegisterPrimitiveRequestHomeComponent } from '@modules/register-primitive-request/components/register-primitive-request-home/register-primitive-request-home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'register-primitive-request',
      component: RegisterPrimitiveRequestHomeComponent,
      data: { title: extract('register-primitive-request') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RegisterPrimitiveRequestRoutingModule {}
