import { Component, HostListener, OnInit} from '@angular/core';
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
                            "chrissequoia.jpg","rachelcollegephoto4.jpg","rachelindia.jpg","rachelpose.jpg","chrisboytoygun.jpg",
                            "chrishike.jpg", "rachel4yrsold.jpg"];
    photocaptions: string[][] = [["","70s roadtrips: 8-tracks and no seatbelts!"," Chris, age 5"],
                                ["I’m clearly too sexy for the Buffalo River Trail!  Also, I’m very tired.","Chris, age 39"],
                                ["Want to win those cookies?  Pro tip: have the correct answers embroidered onto your clothing!","Rachel, age 4"],
                                ["Daring to ask: how puffy can my hair be??","Answer:  Too puffy.","Rachel, age 10"],
                                ["Rocking water sports at Spiritwood Lake, ND.","Next up: synchronized swimming!", "Rachel, age 14"],
                                ["","Blondie, ne’er-do-well, and Harley hog.", "Rachel, age 2"],
                                ["On the mind of all Seattle residents:  whose legs are paler?", "Rachel, age 24"]
                                ,["An early prototype for Japanese anime classic \"Sailor Moon.\"","Chris, age 5"],
                                ["","The happy couple at Flagstaff Mountain, CO."],
                                ["","The fabulous Overtons circa 1982."],
                                ["Classic 80s school pic:  bowl cut, faux fall background and adorable dimples!","Chris, age 10"],
                                ["It was the 90s. Our hair was big. And it was beautiful.","Chris, age 17"],
                                ["","Puppy love!","Chris, age 22"],
                                ["","Among the giants at Sequoia National Park, CA","Chris, age 18"],
                                ["We’re going to make it after all!  Master’s in Public Administration, University of Washington","Rachel, age 36"],
                                ["Water is life.   A community-led total sanitation meeting in Bangladesh.","Rachel, age 29"],
                                ["","The Princess and the Peonies","Rachel, age 32"],
                                ["","70s roadtrips: 8-tracks and no seatbelts!"," Chris, age 5"],
                                ["I’m clearly too sexy for the Buffalo River Trail!  Also, I’m very tired.","Chris, age 39"],
                                ["Want to win those cookies?  Pro tip: have the correct answers embroidered onto your clothing!","Rachel, age 4"]];
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
        this.rtitleWeight = Math.pow(this.framer.getScale(),0.6)*this.titleWeight;
        this.raddressWeight = this.rtitleWeight*0.25;
        this.rmapImageSize = this.mapImageSize*this.framer.getScale();
        this.rrowHeight = this.rowHeight*Math.pow(this.framer.getScale(),0.3);
        
    }

    ngOnInit(){
        this.checkWindowSize();
        console.log("hitting aboutusinit!");
        console.log(this.windowSmall);
        console.log(this.windowSmallHeight);
        this.rtopPos = this.topPos-window.scrollY; 
        this.rtopPos2 = this.topPos2 - window.scrollY;
    }
    onResize(){
      this.screenwidth = window.innerWidth-50;
      this.rmaxframeWidth = window.innerWidth-50;
      this.framer = new frameResizer(1.0,1.0);
      this.rtitleWeight = Math.pow(this.framer.getScale(),0.6)*(this.titleWeight);
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