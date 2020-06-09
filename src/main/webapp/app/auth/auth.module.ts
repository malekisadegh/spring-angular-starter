import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { CredentialsService } from './credentials.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, I18nModule, AuthRoutingModule],
  providers: [CookieService, CredentialsService],
  declarations: [LoginComponent],
})
export class AuthModule {}
