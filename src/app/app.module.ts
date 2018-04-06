import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AddAlarm } from './add-alarm/add-alarm.component';

import { TimerService } from './timer.service';
import { AlarmService } from './alarm.service';
import { QuoteService } from './quote.service';

@NgModule({
  declarations: [
    AppComponent,
    AddAlarm
  ],
  imports: [
    BrowserModule, JsonpModule, HttpModule
  ],
  providers: [
    TimerService,
    AlarmService,
    QuoteService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
