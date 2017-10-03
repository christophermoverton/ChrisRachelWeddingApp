import { Component } from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';
import { routerTransition } from './router.animations';
import {Guest } from './guest';

@Component({
    moduleId: module.id,
    selector: 'Guestbook',
    styleUrls:['./guestbook.component.css'],
    templateUrl: './guestbook.component.html'//,
   /*
    animations: [routerTransition()],
host: {'[@routerTransition]': ''}*/
  })
  export class Guestbook {
    titleWeight: number = 120.0;
    mapImageSize: number = 400.0;
    rmapImageSize: number;
    rtitleWeight: number;
    raddressWeight: number;
    screenwidth = window.innerWidth-150;
    maxframeWidth: number = window.innerWidth-50;
    rmaxframeWidth = window.innerWidth-50;
    guests: Guest[]= [new Guest(1,"John Ready", "bigjohn@johnnyjohnson.com", "Hello Kittens!  Big John here saying 'Meow!'")];
    framer: frameResizer;
    constructor(){
        this.framer = new frameResizer(1.0,1.0);
        this.rtitleWeight = this.framer.getTextResize(this.titleWeight);
        this.raddressWeight = this.rtitleWeight*0.45;
        this.rmapImageSize = this.mapImageSize*this.framer.getScale();
    }
    onResize(){
      this.screenwidth = window.innerWidth-50;
      this.rmaxframeWidth = window.innerWidth-50;
      this.framer = new frameResizer(1.0,1.0);
      this.rtitleWeight = this.framer.getTextResize(this.titleWeight);
      this.raddressWeight = this.rtitleWeight*0.45;
      this.rmapImageSize = this.mapImageSize*this.framer.getScale();

    }
   }