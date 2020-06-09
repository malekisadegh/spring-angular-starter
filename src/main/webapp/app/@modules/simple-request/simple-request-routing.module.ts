import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';
import { NgModule } from '@angular/core';
import { SimpleRequestHomeComponent } from '@modules/simple-request/components/simple-request-home/simple-request-home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'simple-request',
      component: SimpleRequestHomeComponent,
      data: { title: extract('simple-request') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleRequestRoutingModule {}
