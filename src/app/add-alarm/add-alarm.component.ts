import {Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Alarm } from '../alarm';
import { AlarmService } from '../alarm.service';

let M =  window["M"];
@Component({
  selector: 'add-alarm',
  styleUrls: [],
  templateUrl: './add-alarm.component.html'
})
export class AddAlarm implements OnInit {
  
  private alarm: Alarm;
  private timeInput: any;
  private collapse: any;
  private weekdays: Object = Object.assign({}, Alarm.weekObj);
  private JSObject: Object = Object;
  
  @ViewChild('alarmtext') alarmTextInput: ElementRef;
  @ViewChild('repeatcheckbox') repeatCheckBox: ElementRef;

  constructor(private alarmService: AlarmService){}

  ngOnInit(){
    var elem = document.querySelector('.collapsible');
    this.collapse = M.Collapsible.init(elem, {});

    var elem = document.querySelector('.timepicker');
    this.timeInput = M.Timepicker.init(elem, {autoClose:true});
  }

  repeatchange(isChecked: string){
    if(!isChecked){
      this.weekdays = Object.assign({}, Alarm.weekObj);
      let daysNum = (new Date()).getDay();
      let todayDay = Object.keys(Alarm.weekObj)[daysNum];
      this.weekdays[todayDay] = true;
    }
  }
  add() {
    const isrepeat = this.repeatCheckBox.nativeElement.checked;
    const alarmtext = this.alarmTextInput.nativeElement.value;
    let isDaySelected =  false;
    if(!isrepeat){
      for (let day in this.weekdays) {
        if(this.weekdays[day]) {
            isDaySelected = true;
            break;
        }
      }
    }
    else{
      this.weekdays = Object.assign({}, Alarm.weekObj);
    }
    if(!alarmtext || !this.timeInput.time || (!isrepeat && !isDaySelected)) {
      return false;
    }
    let hour12: number = this.timeInput.hours;
    let mins: number = Number.parseInt(this.timeInput.time.split(':')[1]);
    const ampm = this.timeInput.amOrPm;
    const alarmNew =  new Alarm(0, alarmtext, hour12, mins, ampm, isrepeat, this.weekdays);
    this.alarmService.addAlarm(alarmNew);
    this.collapse.close();
    this.weekdays = Object.assign({}, Alarm.weekObj);
    this.repeatCheckBox.nativeElement.checked = true;
    this.alarmTextInput.nativeElement.value ='';
    this.timeInput.el.value='';
    M.updateTextFields();
    return true;
  }
}
