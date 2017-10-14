import { Component, OnInit } from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';
import {LightsAnimDirective} from './lightsanim.directive';

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
  ttitleLeft: number = 260.0;
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
  windowSmall: boolean = false;
  windowSmallHeight: boolean = false;
  constructor(){

       //console.log("this weight: ")
       //console.log(this.rtitleWeight);
       //console.log(this.rttitleLeft)
   }
   ngOnInit(){
    this.framer = new frameResizer(this.titleHeight,this.titleWidth);
    this.rtitleHeight = this.titleHeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getHeight();
    this.rtitleWidth = this.titleWidth*Math.pow(this.framer.getScale(),0.8);//this.framer.getWidth();
    let pos = this.framer.getPositionrefactor(this.titleTop, this.titleLeft,0.8);
    this.rtitleTop = pos.x;
    this.rtitleLeft = pos.y;
    let tpos = this.framer.getPositionrefactor(this.ttitleTop,this.ttitleLeft,0.8);
    this.rttitleTop = tpos.x;
    this.rttitleLeft = tpos.y;
    this.rtitleWeight = this.titleWeight*Math.pow(this.framer.getScale(),0.7);//this.framer.getTextResize(this.titleWeight);
    this.rtitleWeight2 = this.titleWeight2*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.titleWeight2);
    this.rcrtitleWeight = this.rtitleWeight*0.30;
    this.rdatetitleWeight = this.rtitleWeight*0.4;
    this.rresumeHeaderWeight = this.resumeHeaderWeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.resumeHeaderWeight);
    this.rresumeLineWeight = this.resumeLineWeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.resumeLineWeight);
    this.rresumeLineWeight2 = this.resumeLineWeight2*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.resumeLineWeight2);
    this.rmaxframeWidth = this.framer.getScreenResize(this.maxframeWidth);
    this.rchrisImageSize = this.chrisImageSize*Math.pow(this.framer.getScale(),0.8);
    this.rrachelImageSize = this.rachelImageSize*Math.pow(this.framer.getScale(),0.8);
    this.checkWindowSize();
   }
   public onResize(){
    this.framer = new frameResizer(this.titleHeight,this.titleWidth);
    this.rtitleHeight = this.titleHeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getHeight();
    this.rtitleWidth = this.titleWidth*Math.pow(this.framer.getScale(),0.8);//this.framer.getWidth();
    let pos = this.framer.getPositionrefactor(this.titleTop, this.titleLeft,0.8);
    this.rtitleTop = pos.x;
    this.rtitleLeft = pos.y;
    let tpos = this.framer.getPositionrefactor(this.ttitleTop,this.ttitleLeft,0.8);
    this.rttitleTop = tpos.x;
    this.rttitleLeft = tpos.y;
    this.rtitleWeight = this.titleWeight*Math.pow(this.framer.getScale(),0.7);//this.framer.getTextResize(this.titleWeight);
    this.rtitleWeight2 = this.titleWeight2*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.titleWeight2);
    this.rcrtitleWeight = this.rtitleWeight*0.30;
    this.rdatetitleWeight = this.rtitleWeight*0.4;
    this.rresumeHeaderWeight = this.resumeHeaderWeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.resumeHeaderWeight);
    this.rresumeLineWeight = this.resumeLineWeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.resumeLineWeight);
    this.rresumeLineWeight2 = this.resumeLineWeight2*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.resumeLineWeight2);
    this.rmaxframeWidth = this.framer.getScreenResize(this.maxframeWidth);
    this.rchrisImageSize = this.chrisImageSize*Math.pow(this.framer.getScale(),0.8);
    this.rrachelImageSize = this.rachelImageSize*Math.pow(this.framer.getScale(),0.8);
    this.checkWindowSize();
    }
    checkWindowSize(): void{
      if (window.innerWidth < 500.0){
          this.windowSmall = true;
      }
      else{
          this.windowSmall = false;
      }
      if (window.innerHeight < 500.0){
          this.windowSmallHeight = true;
      }
      else{
          this.windowSmallHeight = false;
      }
  }
}
