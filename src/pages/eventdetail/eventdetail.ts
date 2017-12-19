import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { Component,OnInit } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { Event, Constants } from '../../app/models/event';
import  * as moment from 'moment';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'eventdetail.html'
})

export class EventDetailPage implements OnInit {
  event;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
   
  }

  ngOnInit()
  {
    this.event=this.navParams.get("event");
  }

  getEventDatePresentation(date:DateTime) : string
  {
    return moment(date.toString()).calendar(null,Constants.CalenderStringPresentations)
  }
}
