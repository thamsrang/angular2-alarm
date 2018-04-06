import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Alarm } from './alarm';
import { QuoteService } from './quote.service';
import { Quote } from './quote';

let M = window["M"];

@Injectable()
export class AlarmService {
  count: number;
  alarms: Alarm[] = new Array<Alarm>();
  observableQuote: Observable<Quote[]>

  constructor( private quoteService: QuoteService) {
    let localAlarms = localStorage.getItem('alarms');
    
    if(!localAlarms){
      let timenow1 =new Date();
      timenow1.setMinutes(timenow1.getMinutes()+2);
      let weekObj = Object.assign({}, Alarm.weekObj);
      const day: string = Object.keys(weekObj)[timenow1.getDay()];
     
      let hour = timenow1.getHours();
      let ampm = hour >= 12 ? "PM" : "AM";
      hour = (hour > 12) ? (hour - 12) : hour;
      const alarm1 = new Alarm(1, "Goto Gym", hour, timenow1.getMinutes(), ampm, true, weekObj);
      timenow1.setMinutes(timenow1.getMinutes()+1);
      const alarm2 = new Alarm(2, "Have Breakfast", hour, timenow1.getMinutes(), ampm, true, weekObj);
      weekObj[day]=true;
      timenow1.setMinutes(timenow1.getMinutes()-2);
      const alarm3 = new Alarm(3, "Checkout", hour, timenow1.getMinutes(), ampm, false, weekObj);
      this.alarms.push(alarm1);
      this.alarms.push(alarm2);
      this.alarms.push(alarm3);
      let alarmsJson: any[]=[];
      alarmsJson.push(alarm1.toJson());
      alarmsJson.push(alarm2.toJson());
      alarmsJson.push(alarm3.toJson());
      localStorage.setItem('alarms', JSON.stringify(alarmsJson));
    }
    else{
      let alarmsJson: any[]= JSON.parse(localAlarms);
      alarmsJson.forEach((e) =>{
        let alarm = new Alarm(e.id, e.note, e.hour12, e.mins, e.ampm, e.isrepeat, e.weekdays);
        this.alarms.push(alarm);
      });
    }
    this.count = this.alarms.length;
  }

  getAlarms(): Observable<Alarm[]> {
    return Observable.of(this.alarms);
  }

  addAlarm(alarm: Alarm) {
    alarm.id = this.count +1;
    this.count++;
    let localAlarms = localStorage.getItem('alarms');
    let alarmsJson: any[]= JSON.parse(localAlarms);
    alarmsJson.push(alarm.toJson());
    localStorage.setItem('alarms', JSON.stringify(alarmsJson));
    this.alarms.push(alarm);
  }

  removeAlarm(alarm: Alarm, indx: number){
    let alarmsJson: any[]= [];
    this.alarms.forEach((e) =>{
      if(e.id != alarm.id)
        alarmsJson.push(e.toJson());
    });
    localStorage.setItem('alarms', JSON.stringify(alarmsJson));
    this.alarms.splice(indx, 1);
  }

  checkAlarms(){
    this.alarms.forEach((alarm, i) => {
      alarm.triggerAlert() && this.timeReach(alarm, i);
    });
  }
  
  timeReach(alarm: Alarm, index: number) {
    const indx = this.alarms.indexOf(alarm);
    if(indx != -1){
      const quote = new Quote();
      this.observableQuote = this.quoteService.getQuotes();
      let alarmHTML = "<div class='toast-action'><span>"+ alarm.note +" - <small>"+alarm.hour12+":"+alarm.mins+" "+alarm.ampm+"</small></span></div>";
    	this.observableQuote.subscribe(
            quotes => {
                let quoteString: string = quotes[0].content + alarmHTML;
                let toastM = M.toast({html: quoteString, outDuration:5000});
              },
            error =>  console.log(error));
      // this.alarmService.removeAlarm(alarm, indx);
    }
  }
}