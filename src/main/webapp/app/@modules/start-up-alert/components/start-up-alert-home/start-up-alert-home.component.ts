import { Component, Inject, OnInit } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertiesService } from '@core/services/local/properties.service';
import { StaticValueService } from '@shared/util/static-value.service';

@Component({
  selector: 'app-start-up-alert-home',
  templateUrl: './start-up-alert-home.component.html',
  styleUrls: ['./start-up-alert-home.component.scss'],
})
export class StartUpAlertHomeComponent implements OnInit {
  law: string;
  startUpForm: false;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private properties: PropertiesService
  ) {}

  ngOnInit() {
    this.law = this.properties.data.startLaw;
  }

  submitLaw() {
    if (this.startUpForm) {
      localStorage.setItem(
        StaticValueService.LOCAL_STORAGE_STARTUP_LAW,
        StaticValueService.LOCAL_STORAGE_STARTUP_LAW_ACCEPT
      );
      this.dialogRef.close();
    }
  }
}
