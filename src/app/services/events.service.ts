import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { StatusBar } from '@ionic-native/status-bar';
import { Event,Member } from './../models/event';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import _, { Dictionary } from 'lodash';
import  * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';



@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  getQuery(startsWith:string)
  {
    return `https://tsh-app.firebaseio.com/events.json`;
  }

  getEvents(val:string) : Observable<any>
  {
    return this.http.get(this.getQuery(val));
  }

  orderEvents(events:Event[]) : Event[]{
    return _.orderBy(events,(event)=>{
      return event.DateString;
    });
  }

  mapEvents(events) : Event[] {
    return _.map<any,Event>(events,(event)=>{
        
        var eventMoment= moment(event.dateTime,"DD-MM-YYYY HH:mm:ss");
        
        var newEvent= new Event();
        newEvent.DateTime = eventMoment.toDate();
        newEvent.DateString = eventMoment.format("DD-MM-YYYY");
        newEvent.Description= event.description;
        newEvent.Week =eventMoment.week();
        newEvent.Id= event.id;
        newEvent.Image= event.image;
        newEvent.Status= event.status;
        newEvent.Title= event.title;
        newEvent.Members = _.map<any,Member>(event.members,(member) => {
            var newMember = new Member();
            newMember.Id= member.id;
            newMember.Photo= member.photo;
            return newMember;
        });

        return newEvent;
    });
  } 

groupEventsBasedOnWeek(events) : Dictionary<any> {
    var newEvents= _.map<any,Event>(events,(event)=>{
        var newEvent= new Event();
        newEvent.DateTime = moment(event.dateTime,"DD-MM-YYYY HH:mm:ss").toDate();
        newEvent.Description= event.description;
        newEvent.Week =moment(event.dateTime,"DD-MM-YYYY HH:mm:ss").week();
        newEvent.Id= event.id;
        newEvent.Image= event.image;
        newEvent.Status= event.status;
        newEvent.Title= event.title;
        newEvent.Members = _.map<any,Member>(event.members,(member) => {
            var newMember = new Member();
            newMember.Id= member.id;
            newMember.Photo= member.photo;
            return newMember;
        });

        return newEvent;
    });
    
    var orderedEvents= _.orderBy(newEvents,(event)=>{
    return moment(event.DateTime);
  });
    return _.groupBy(orderedEvents,(event) => {
        return moment(event.DateTime).week();
    });
  } 
}