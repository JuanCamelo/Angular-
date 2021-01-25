import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { IndexPageComponent } from './pages/index-page/index-page.component';

// Boostrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Devexpress
import { DxPopupModule, DxTextBoxModule, DxListModule } from 'devextreme-angular';
// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Redux
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers } from './store/app.reducers';
// Components
import { LoaderComponent } from './components/loader/loader.component';
import { RedirectExternalPageComponent } from './pages/redirect-external-page/redirect-external-page.component';
import { InterceptorService } from './services/interceptor.service';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './utils/lower-case-url-serializer';
import { EffectsModule } from '@ngrx/effects';
import { PatientInfoEffect } from './store/effects/patient-info.effect';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    LoaderComponent,
    IndexPageComponent,
    RedirectExternalPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient] }
    }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      PatientInfoEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    DxPopupModule,
    DxTextBoxModule,
    DxListModule,
    ComponentsModule
  ],
  providers: [
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Requerido para compilacion AOT
export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
