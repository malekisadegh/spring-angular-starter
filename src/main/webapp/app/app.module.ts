import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UrlSerializer } from '@angular/router';

import { LowerCaseUrlSerializer } from '@shared/serializer/LowerCaseUrlSerializer';
import { HeaderComponent } from '@core/header/header.component';
import { SideMenuComponent } from '@core/side-menu/side-menu.component';
import { TopMenuComponent } from '@core/top-menu/top-menu.component';
import { HomeModule } from '@modules/home/home.module';
import { BranchRequestModule } from '@modules/branch-request/branch-request.module';
import { InquiryRequestModule } from '@modules/inquiry-request/inquiry-request.module';
import { RegisterPrimitiveRequestModule } from '@modules/register-primitive-request/register-primitive-request.module';
import { AuthInterceptor } from '@core/interceptor/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PropertiesService } from '@core/services/local/properties.service';
import { ServiceModule } from '@core/services/service.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SimpleRequestModule } from '@modules/simple-request/simple-request.module';
import { MatCardModule } from '@angular/material/card';
import { StartUpAlertModule } from '@modules/start-up-alert/start-up-alert.module';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    SharedModule,
    CoreModule,
    ShellModule,
    AuthModule,
    BrowserAnimationsModule,
    HomeModule,
    BranchRequestModule,
    InquiryRequestModule,
    RegisterPrimitiveRequestModule,
    SimpleRequestModule,
    ServiceModule,
    StartUpAlertModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    MatCardModule,
    // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, HeaderComponent, SideMenuComponent, TopMenuComponent],
  providers: [
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: setupPropertiesFactory,
      deps: [PropertiesService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function setupPropertiesFactory(service: PropertiesService) {
  return () => service.use('./content/config/properties.json');
}
