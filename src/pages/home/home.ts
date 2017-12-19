import { Member , Event } from './../../app/models/event';
import { EventService } from './../../app/services/events.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { EventDetailPage } from './../eventdetail/eventdetail';
import _, { Dictionary } from 'lodash';
import  * as moment from 'moment';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  allEvents: Event[];
  filteredEvents : Event[];
  noEventFound: boolean;
  hasError:boolean;
  errorText:string;

  constructor(public navCtrl: NavController,public httpClient: HttpClient , public  eventService:EventService ) {
    
  }

  ngOnInit()
  {
    this.loadEvents();
  }

  loadEvents(filterParam?:string) 
  {
    if (this.allEvents===undefined || this.allEvents===null)
    {
    this.eventService.getEvents(filterParam).catch((e: any) => Observable.throw(this.errorHandler(e)))
    .subscribe(data => {
      this.allEvents= this.eventService.orderEvents(this.eventService.mapEvents(data));
      if (filterParam!==undefined && filterParam!=="")
      this.filteredEvents= this.filterEventsWithEventName(filterParam,this.allEvents);
      else
      this.filteredEvents=this.allEvents;

      this.noEventFound=this.filteredEvents.length<1;
      });
    }
    else
    {
      if (filterParam!==undefined && filterParam!=="")
      this.filteredEvents=this.filterEventsWithEventName(filterParam,this.allEvents);
      else
      this.filteredEvents=this.allEvents;

      this.noEventFound=this.filteredEvents.length<1;
    } 
  }

  errorHandler(error: any): void {
    this.hasError=true;
    this.errorText="Opps !!! Something went wrong";
  }

  searchEvents(ev) {
    var val = ev.target.value;
    this.loadEvents(val);
  }

  filterEventsWithEventName(eventName:string,events:Event[]) : Event[]
  {
    return _.filter(events,(event)=> {
      return event.Title.toLowerCase().indexOf(eventName.toLowerCase()) > -1;
    })
  }

  getTodaysEvents(events:Event[]) : Event[]
  {
    var today= moment().format("DD-MM-YYYY");
    return _.filter(events,(event)=> {
      return event.DateString===today;
    });
  }

  getThisWeeksEvents(events: Event[]) : Event[]
  {
    var sevenDaysLayer=moment().add(7,"days").toDate();
    var today = moment().format("DD-MM-YYYY");
    var currentWeek = moment().week();
    return _.filter(events,(event)=> {
      return event.Week===currentWeek && event.DateTime < sevenDaysLayer && event.DateString > today ;
    });
  }

  getOtherEvents(events:Event[])
  {
    var sevenDaysLayer=moment().add(7,"days").toDate();
    return _.filter(events,(event)=> {
      return event.DateTime > sevenDaysLayer;
    });
  }

  navigateToEventDetail(event:Event) {
  
    if (event.Title)
    {
    this.navCtrl.push(EventDetailPage,{"event":event});
    }
  }
}
