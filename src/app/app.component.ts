import { Component } from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  titleHeight: number = 298.0;
  titleWidth: number = 1236.0;
  titleTop: number = 0.0;
  titleLeft: number = 100.0;
  titleWeight: number = 120.0;  //78.0
  titleWeight2: number = 154.0; //120
  ttitleLeft: number = 270.0;
  ttitleTop: number = 75.0;
  rtitleHeight: number;
  rtitleWidth: number;
  rtitleTop: number;
  rtitleLeft: number;
  rtitleWeight: number;
  rtitleWeight2: number;
  rttitleLeft: number;
  rttitleTop: number;
  rcrtitleWeight: number; 
  rdatetitleWeight: number;
  resumeHeaderWeight: number = 25.0;
  rresumeHeaderWeight: number;
  resumeLineWeight: number = 25.0;
  rresumeLineWeight: number;
  resumeLineWeight2: number = 22.0;
  rresumeLineWeight2: number;
  maxframeWidth: number = 1305;
  framewidths:[number] = [1305]
  chrisImageSize = 160.0;//pixels
  rachelImageSize = 160.0;
  rrachelImageSize: number = 150.0;
  rchrisImageSize: number = 150.0;
  crplusWeight: number = 25.0;
  rmaxframeWidth: number;
  scrollpos: number = 0.0;
  framer: frameResizer;
  constructor(){
    //called first time before the ngOnInit()
       this.framer = new frameResizer(this.titleHeight,this.titleWidth);
       this.rtitleHeight = this.framer.getHeight();
       this.rtitleWidth = this.framer.getWidth();
       let pos = this.framer.getPosition(this.titleTop, this.titleLeft);
       this.rtitleTop = pos.x;
       this.rtitleLeft = pos.y;
       let tpos = this.framer.getPosition(this.ttitleTop,this.ttitleLeft);
       this.rttitleTop = tpos.x;
       this.rttitleLeft = tpos.y;
       this.rtitleWeight = this.framer.getTextResize(this.titleWeight);
       this.rtitleWeight2 = this.framer.getTextResize(this.titleWeight2);
       this.rcrtitleWeight = this.rtitleWeight*0.30;
       this.rdatetitleWeight = this.rtitleWeight*0.4;
       this.rresumeHeaderWeight = this.framer.getTextResize(this.resumeHeaderWeight);
       this.rresumeLineWeight = this.framer.getTextResize(this.resumeLineWeight);
       this.rresumeLineWeight2 = this.framer.getTextResize(this.resumeLineWeight2);
       this.rmaxframeWidth = this.framer.getScreenResize(this.maxframeWidth);
       this.rchrisImageSize = this.chrisImageSize*this.framer.getScale();
       this.rrachelImageSize = this.rachelImageSize*this.framer.getScale();
       //console.log("this weight: ")
       //console.log(this.rtitleWeight);
       //console.log(this.rttitleLeft)
   }

   public onResize(){
    this.framer = new frameResizer(this.titleHeight,this.titleWidth);
    this.rtitleHeight = this.framer.getHeight();
    this.rtitleWidth = this.framer.getWidth();
    let pos = this.framer.getPosition(this.titleTop, this.titleLeft);
    this.rtitleTop = pos.x;
    this.rtitleLeft = pos.y;
    let tpos = this.framer.getPosition(this.ttitleTop,this.ttitleLeft);
    this.rttitleTop = tpos.x;
    this.rttitleLeft = tpos.y;
    this.rtitleWeight = this.framer.getTextResize(this.titleWeight);
    this.rtitleWeight2 = this.framer.getTextResize(this.titleWeight2);
    this.rcrtitleWeight = this.rtitleWeight*0.30;
    this.rdatetitleWeight = this.rtitleWeight*0.4;
    this.rresumeHeaderWeight = this.framer.getTextResize(this.resumeHeaderWeight);
    this.rresumeLineWeight = this.framer.getTextResize(this.resumeLineWeight);
    this.rresumeLineWeight2 = this.framer.getTextResize(this.resumeLineWeight2);
    this.rmaxframeWidth = this.framer.getScreenResize(this.maxframeWidth); 
    this.rchrisImageSize = this.chrisImageSize*this.framer.getScale();
    this.rrachelImageSize = this.rachelImageSize*this.framer.getScale();
    }
}
