import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeKo from './time/ko';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TimeComponent} from './time/time.component';

registerLocaleData(localeKo, 'ko');

@NgModule({
  declarations: [
    AppComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
