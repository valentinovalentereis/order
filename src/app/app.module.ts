import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './/app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LayoutModule } from './/layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { HttpClientModule } from '@angular/common/http';
import { NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ScriptLoaderService,
    {
      provide:  NG_SELECT_DEFAULT_CONFIG,
      useValue: {
          notFoundText: 'Não encontrado!',

      },
  }],
  /*
      provide: CURRENCY_MASK_CONFIG,
      useValue: {CustomCurrencyMaskConfig

  
  */
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
