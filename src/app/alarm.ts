export class Alarm {
    public static weekObj: Object = {Sun:false, Mon:false, Tue:false, Wed:false, Thu:false, Fri:false, Sat:false};
    id: number;
    note: string;
    hour: number;
    hour12: number;
    ampm: string;
    mins: number;
    isrepeat: boolean;
    weekdays: Object;
    constructor(id: number, note: string, hour12: number, mins: number, ampm:string, isrepeat: boolean, weekdays: Object){
      this.id = id;
      this.note = note;
      if(ampm == "PM")
        this.hour = (hour12 < 12) ? (hour12 + 12) : hour12;
      else
        this.hour = hour12;
      this.hour12 = hour12;
      this.ampm = ampm;
      this.mins = mins;
      this.isrepeat = isrepeat;
      this.weekdays = weekdays;
    }

    triggerAlert(): boolean {
      let timenow = new Date();
      let isDayMatched: boolean = true;
      let isHourMatched: boolean;
      let isMinsMatched: boolean;
      if(!this.isrepeat)
        isDayMatched = this.weekdays[Object.keys(Alarm.weekObj)[timenow.getDay()]];

      isHourMatched = this.hour == timenow.getHours();
      isMinsMatched = this.mins == timenow.getMinutes();
      return isDayMatched && isHourMatched && isMinsMatched;
    }
    toJson(): Object {
      return {id: this.id, note: this.note, hour: this.hour, hour12: this.hour12, mins: this.mins, ampm:this.ampm,
               isrepeat: this.isrepeat, weekdays: this.weekdays};
    }
  }