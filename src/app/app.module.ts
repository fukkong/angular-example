import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeKo from './time/ko';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TimeComponent} from './time/time.component';
import { HighchartComponent } from './highchart/highchart.component';
import {HttpClientModule} from '@angular/common/http';

registerLocaleData(localeKo, 'ko');

@NgModule({
  declarations: [
    AppComponent,
    TimeComponent,
    HighchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
