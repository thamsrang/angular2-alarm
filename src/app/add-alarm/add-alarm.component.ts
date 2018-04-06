import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
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
    }
  }

  add(repeatCheckBoxRef:HTMLInputElement, alarmTextRef:HTMLInputElement) {
    console.log(alarmTextRef.value);
    if(!alarmTextRef.value || !this.timeInput.time){
      return false;
    }
    let hour12: number = this.timeInput.hours;
    const mins = this.timeInput.time.split(':')[1];
    const ampm = this.timeInput.amOrPm;
    const isrepeat = repeatCheckBoxRef.checked;
    const alarmNew =  new Alarm(0, alarmTextRef.value, hour12, mins, ampm, isrepeat, this.weekdays);
    this.alarmService.addAlarm(alarmNew);
    this.collapse.close();
    this.weekdays = Object.assign({}, Alarm.weekObj);
    repeatCheckBoxRef.checked=true;
    alarmTextRef.value ='';
    this.timeInput.el.value='';
    return true;
  }
}
