import { Component, Injectable, OnInit } from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';
import { routerTransition } from './router.animations';
import {Guest } from './guest';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {SearchService} from './SearchService'

@Injectable()
@Component({
    moduleId: module.id,
    selector: 'Guestbook',
    styleUrls:['./guestbook.component.css'],
    templateUrl: './guestbook.component.html'//,
   /*
    animations: [routerTransition()],
host: {'[@routerTransition]': ''}*/
  })
  export class Guestbook implements OnInit{
    titleWeight: number = 120.0;
    mapImageSize: number = 400.0;
    rmapImageSize: number;
    rtitleWeight: number;
    raddressWeight: number;
    screenwidth = window.innerWidth-150;
    maxframeWidth: number = window.innerWidth-50;
    rmaxframeWidth = window.innerWidth-50;
    guests: Guest[]= [new Guest(1,"John Ready", "bigjohn@johnnyjohnson.com", "Hello Kittens!  Big John here saying 'Meow!'")];
    //posts: Object = [];
    //p: any;
    framer: frameResizer;
    posted: boolean[] = [false];
    constructor(public posts: SearchService){
        this.framer = new frameResizer(1.0,1.0);
        this.rtitleWeight = this.titleWeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.titleWeight);
        this.raddressWeight = this.rtitleWeight*0.45;
        this.rmapImageSize = this.mapImageSize*this.framer.getScale();
       
    }

    ngOnInit() {
        this.getGuestEntries();
        console.log(this.posts);
    }
    onResize(){
      this.screenwidth = window.innerWidth-50;
      this.rmaxframeWidth = window.innerWidth-50;
      this.framer = new frameResizer(1.0,1.0);
      this.rtitleWeight = this.titleWeight*Math.pow(this.framer.getScale(),0.8);//this.framer.getTextResize(this.titleWeight);
      this.raddressWeight = this.rtitleWeight*0.45;
      this.rmapImageSize = this.mapImageSize*this.framer.getScale();

    }
    getGuestEntries(){
        this.posts.search();
        this.posted[0] = false;
        //this.http.get("http://chrisandrachelwedding.atwebpages.com/getrecords.php").map((res: Response) => {var json=JSON.stringify(res); console.log(JSON.parse(json)); return JSON.parse(json);}).subscribe(arg => this.posts = arg);
    }
   }