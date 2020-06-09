import { NgModule } from '@angular/core';
import { StartUpAlertHomeComponent } from '@modules/start-up-alert/components/start-up-alert-home/start-up-alert-home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [MatDialogModule, SharedModule, MatCheckboxModule, ReactiveFormsModule, FormsModule, MatTooltipModule],
  declarations: [StartUpAlertHomeComponent],
})
export class StartUpAlertModule {}
