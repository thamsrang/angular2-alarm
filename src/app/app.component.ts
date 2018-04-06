import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TimerService } from './timer.service';
import { QuoteService } from './quote.service';

import { Alarm } from './alarm';
import { Quote } from './quote';
import { AlarmService } from './alarm.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private JSObject: Object = Object;
  timenow: number = Date.now();
  alarms: Alarm[] = new Array<Alarm>();

  constructor(private alarmService: AlarmService ,timerService: TimerService) {
    timerService.getTimer().subscribe(x => { this.timenow = Date.now(); alarmService.checkAlarms()});
    alarmService.getAlarms().subscribe(x => { this.alarms = x });
  }
}
