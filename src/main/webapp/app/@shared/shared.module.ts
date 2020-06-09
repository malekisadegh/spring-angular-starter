import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WidgetPanelComponent } from '@shared/templates/widget-panel/widget-panel.component';
import { ReplacePipe } from '@shared/util/pipe/replace.pipe';
import { BankCodePipe } from '@shared/util/pipe/bank-code.pipe';
import { SanitizeHtmlPipe } from '@shared/util/pipe/sanitize-html.pipe';

@NgModule({
  imports: [CommonModule, MaterialModule, TranslateModule.forRoot({ defaultLanguage: 'fa' }), FlexLayoutModule],
  declarations: [LoaderComponent, WidgetPanelComponent, ReplacePipe, BankCodePipe, SanitizeHtmlPipe],
  exports: [
    LoaderComponent,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    WidgetPanelComponent,
    ReplacePipe,
    BankCodePipe,
    SanitizeHtmlPipe,
  ],
})
export class SharedModule {}
