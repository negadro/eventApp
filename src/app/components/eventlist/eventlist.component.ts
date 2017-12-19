import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { Component,Input,Output, EventEmitter ,OnInit } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { Event } from '../../models/event';
import  * as moment from 'moment';
import { Events } from 'ionic-angular/util/events';

@Component({
  selector: 'event-list',
  templateUrl: './eventlist.html'
})

export class EventListComponent implements OnInit {
  @Input() events: Event[];
  @Input() listName : string;
  @Output('click') click = new EventEmitter<any>();
  hasEvents: boolean;
  constructor() {

  }

  ngOnInit() {
   this.hasEvents= (this.events!=null && this.events.length>0);
  }

  ngOnChanges(){
    this.hasEvents= (this.events!=null && this.events.length>0);
  }

  onClick(event:Event)
  {
    if (event.Title)
    {
      this.click.emit(event);
    }
  }
}
