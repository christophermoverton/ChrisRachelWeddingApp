import { Component } from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';
import { routerTransition } from './router.animations';

@Component({
    moduleId: module.id,
    selector: 'Ceremony',
    styleUrls:['./ceremony.component.css'],
    templateUrl: './ceremony.component.html'//,
   /*
    animations: [routerTransition()],
host: {'[@routerTransition]': ''}*/
  })
  export class Ceremony {
    titleWeight: number = 120.0;
    mapImageSize: number = 400.0;
    rmapImageSize: number;
    rtitleWeight: number;
    raddressWeight: number;
    screenwidth = window.innerWidth-150;
    maxframeWidth: number = window.innerWidth-50;
    rmaxframeWidth = window.innerWidth-50;
    windowSmall: boolean = false;
    framer: frameResizer;
    constructor(){
        this.framer = new frameResizer(1.0,1.0);
        this.rtitleWeight = this.titleWeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.titleWeight);
        this.raddressWeight = this.rtitleWeight*0.45;
        this.rmapImageSize = this.mapImageSize*Math.pow(this.framer.getScale(),0.8);
    }
    onResize(){
      this.screenwidth = window.innerWidth-50;
      this.rmaxframeWidth = window.innerWidth-50;
      this.framer = new frameResizer(1.0,1.0);
      this.rtitleWeight = this.titleWeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.titleWeight);
      this.raddressWeight = this.rtitleWeight*0.45;
      this.rmapImageSize = this.mapImageSize*Math.pow(this.framer.getScale(),0.8);

    }

    checkWindowSize(): void{
      if (window.innerWidth < 500.0){
          this.windowSmall = true;
      }
      else{
          this.windowSmall = false;
      }
      
    }
   }