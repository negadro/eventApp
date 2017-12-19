import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { Component,Input,Output, EventEmitter ,OnInit } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { Event, Constants } from '../../models/event';
import  * as moment from 'moment';

@Component({
  selector: 'event',
  templateUrl: './event.html'
})

export class EventComponent implements OnInit {
  @Input() event: Event;
  @Output('click') click = new EventEmitter<any>();
  statusSelected:boolean;
  statusNotSelected:boolean;
  showGoing:boolean=true;
  showIgnore:boolean = true;
  goingChecked:boolean=false;
  ignoreChecked:boolean=false;

  constructor() {

  }

  ngOnInit() {
   this.toogleStatus(this.event.Status);
  }

  ngOnChanges(){
    this.toogleStatus(this.event.Status);
  }

  getStringPresentationOfDay(date:DateTime) : string
  {
    return moment(date.toString()).calendar(null,Constants.CalenderStringPresentations);
  }

  getEventDay(date:DateTime): string{
    return moment(date.toString()).format("MMM")
  }

  getEventMonth(date:DateTime) : string {
    return moment(date.toString()).format("D");
  }

  selectEvent(event:Event)
  {
    this.click.emit(event);
  }

  going(){
    this.toogleStatus("going");
  }

  ignore()
  {
    this.toogleStatus("ignore");
  }

  toogleStatus(status:string) 
  {
    this.statusSelected=true;
    this.statusNotSelected=false;
    if (status==="going")
    {
    this.showGoing=true;
    this.goingChecked=true;
    this.showIgnore=false;
    }
    else if (status==="ignore")
    {
      this.showGoing=false;
      this.ignoreChecked=true;
      this.showIgnore=true;
    }
  }
}
