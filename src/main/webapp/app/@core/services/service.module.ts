import { NgModule } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { CustomerDetailsService } from '@core/services/customer/customer-details.service';
import { ParamService } from '@core/services/param.service';
import { InitialRequestService } from '@core/services/request/initial-request.service';
import { DateTimeService } from '@core/services/local/date-time.service';

@NgModule({
  providers: [ConnectionService, CustomerDetailsService, ParamService, InitialRequestService, DateTimeService],
})
export class ServiceModule {}
