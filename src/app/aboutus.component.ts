import { Component, HostListener} from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';
import { routerTransition } from './router.animations';
import { NgClass, NgStyle } from '@angular/common';
import {LightsAnimDirective} from './lightsanim.directive'

@Component({
    moduleId: module.id,
    selector: 'Aboutus',
    styleUrls:['./aboutus.component.css'],
    templateUrl: './aboutus.component.html'//,
   /*
    animations: [routerTransition()],
host: {'[@routerTransition]': ''}*/
  })
  export class Aboutus {
    titleWeight: number = 120.0;
    mapImageSize: number = 400.0;
    rowHeight: number = 250.0;
    rmapImageSize: number;
    rtitleWeight: number;
    raddressWeight: number;
    rrowHeight: number;
    screenwidth = window.innerWidth-150;
    maxframeWidth: number = window.innerWidth-50;
    rmaxframeWidth = window.innerWidth-50;
    framer: frameResizer;
    photonames: string[] = ["chrisboytoygun.jpg","chrishike.jpg","rachel4yrsold.jpg","rachel8yearsold.jpg","rachelboat2.jpg",
                            "rachelcarousel2.jpg","rachelcollegephoto2.jpg","chrisnicolestudiokids.jpg","chrisrachel.jpg",
                            "chrisfamily.jpg","chrisstudio.jpg","chrisnicolehighschool.jpg","chrissadie.jpg",
                            "chrissequoia.jpg","rachelcollegephoto4.jpg","rachelindia.jpg","rachelpose.jpg","chrisboytoygun.jpg", "chrishike.jpg", "rachel4yrsold.jpg"];
    selectedphoto: string = this.photonames[0];
    selectedindex: number = 0;
    selectedindexoffset: number = 0;
    typosition: number[] = [0,0,0,15,0,0,0,25,0,29,15,0,0,0,0,0,0,0,0,0];
    typosition2: number[] = [0,0,0,15,0,0,15,25,0,29,15,0,0,0,0,0,0,0,0,0];
    typosition3: number[] = [0,5,0,0,0,0,0,0,5,0,0,0,0,0,0,0,15,0,5,0];
    typosition4: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0];
    windowSmall: boolean = false;
    windowSmallHeight: boolean = false;
    fadeIn: boolean = true;
    topPos: number = window.innerHeight*0.05;
    topPos2: number = window.innerHeight*0.3;
    rtopPos: number = 0;
    rtopPos2: number = 0;
    constructor(){
        this.framer = new frameResizer(1.0,1.0);
        this.rtitleWeight = Math.pow(this.framer.getScale(),0.4)*this.titleWeight;
        this.raddressWeight = this.rtitleWeight*0.45;
        this.rmapImageSize = this.mapImageSize*this.framer.getScale();
        this.rrowHeight = this.rowHeight*Math.pow(this.framer.getScale(),0.3);
        this.checkWindowSize();
    }
    onResize(){
      this.screenwidth = window.innerWidth-50;
      this.rmaxframeWidth = window.innerWidth-50;
      this.framer = new frameResizer(1.0,1.0);
      this.rtitleWeight = Math.pow(this.framer.getScale(),0.4)*(this.titleWeight);
      this.raddressWeight = this.rtitleWeight*0.45;
      this.rmapImageSize = this.mapImageSize*this.framer.getScale();
      this.rrowHeight = this.rowHeight*Math.pow(this.framer.getScale(),0.3);
      this.checkWindowSize();
      
    }

    @HostListener('window:scroll') onScroll() {
        this.rtopPos = this.topPos-window.scrollY; 
        this.rtopPos2 = this.topPos2 - window.scrollY;
      }

    onSelect(sindex: number): void {
        this.selectedphoto = this.photonames[sindex];
        this.selectedindex = sindex;
      }
    
    onSelectLeft(): void{
        if ((this.selectedindex -1) < 0){
            this.selectedindex = this.photonames.length-1;
        }
        else{
            this.selectedindex = this.selectedindex-1;
        }
        this.toggleFadeAnim();
        setTimeout(() => 
        {
            /*
            if ((this.selectedindex -1) < 0){
                this.selectedindexoffset = this.photonames.length-1;
            }
            else{
                this.selectedindexoffset = this.selectedindex-1;
            }*/
            this.selectedindexoffset = this.selectedindex;
            this.selectedphoto = this.photonames[this.selectedindex];
            this.toggleFadeAnim();
        },
        1000);

    }
    onSelectRight(): void{
        this.selectedindex = (this.selectedindex+1)%this.photonames.length;
        this.toggleFadeAnim();
        setTimeout(() => 
        {
            //this.selectedindexoffset = (this.selectedindex+1)%this.photonames.length;
            this.selectedindexoffset = this.selectedindex;
            this.selectedphoto = this.photonames[this.selectedindex];
            this.toggleFadeAnim();
        },
        1000);
    }
    checkWindowSize(): void{
        if (window.innerWidth < 600.0){
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
    toggleFadeAnim(): void{
        if (this.fadeIn){
            this.fadeIn = false;
        }
        else{
            this.fadeIn = true;
        }
    }
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
   }