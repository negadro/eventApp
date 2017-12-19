import * as moment from 'moment';
import { Moment } from 'moment';

export class Event {
    DateTime : Date;
    Description : string;
    Id : number;
    Image :string;
    Members : Array<Member>;
    Status : string;
    Title : string;
    Week : number;
    DateString:string;
}

export class Member 
{
    Id : number;
    Photo : string;
}

export class EventDatePresentator
{
    constructor(private event : Event){

    }
}

export class Constants
{
    static CalenderStringPresentations :any= {
        sameDay: '[Today] [from] h a',
        nextDay: '[Tomorrow] [from] h a',
        nextWeek: 'MMM D, [from] h a',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'MMM D, [from] h a'
    };
}