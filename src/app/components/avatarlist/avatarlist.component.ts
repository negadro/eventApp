import { Member } from './../../models/event';

import { Component,Input,OnInit } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';

@Component({
  selector: 'avatar-list',
  templateUrl: './avatarlist.html'
})

export class AvatarListComponent implements OnInit  {
 @Input() members: Member[];
 @Input() size : string;
 @Input() maxCount : number = 2;
 @Input() enableRemainingAvatar : boolean;
 
 filteredMembers : Member[];
 showRemainingsAsText:boolean;
 showRemainingsAsAvatar : boolean;
 remaingCount : number;

  constructor() {

  }

  ngOnInit() {
    if (this.members.length>this.maxCount){
      this.filteredMembers=[];
      for(var i=0;i<this.maxCount;++i)
      {
        this.filteredMembers.push(this.members[i]);
      }
      this.determineRemaingPresentation(this.members.length-this.maxCount,this.enableRemainingAvatar);
    }
   else
   this.filteredMembers= this.members;
  }

  determineRemaingPresentation(remaining:number,enableRemainingAvatar:boolean)
  {
    this.remaingCount=remaining;

    if (remaining>0)
    {
      if (!enableRemainingAvatar)
          this.showRemainingsAsText=true;
          else
          this.showRemainingsAsAvatar=true;
    }
  }
}
