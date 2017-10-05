import { Component, Injectable } from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';
import { Guest }    from './guest';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
@Component({
  selector: 'guest-form',
  styleUrls:['./guest-form.component.css'],
  templateUrl: './guest-form.component.html'
})
export class GuestFormComponent {
    titleWeight: number = 70.0;
    labelWeightmult: number = 0.5;
    rlabelWeight: number;
    mapImageSize: number = 400.0;
    rmapImageSize: number;
    rtitleWeight: number;
    raddressWeight: number;
    screenwidth = window.innerWidth-150;
    maxframeWidth: number = window.innerWidth-50;
    rmaxframeWidth = window.innerWidth-50;
    //private http: Http;
    framer: frameResizer;
    test: number;
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Guest(18, 'Dr IQ', this.powers[0], 'Hello hello my name is Jim Bobby.\n Been an old friend of shorty there!\n Gratz!');

  submitted = false;
  constructor(private http: Http){
    //this.http = http;
    this.framer = new frameResizer(1.0,1.0);
    this.rtitleWeight = this.framer.getTextResize(this.titleWeight);
    this.raddressWeight = this.rtitleWeight*0.45;
    this.rlabelWeight = this.labelWeightmult*this.rtitleWeight;
    this.rmapImageSize = this.mapImageSize*this.framer.getScale();
  }
  onSubmit() { this.submitted = true; }
  newGuest() {
    this.model = new Guest(42, '','', '');
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  postData() {
    console.log('hitting function!');
    console.log(window.location.href);
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    console.log(JSON.stringify({name:this.model.name, email: this.model.email, message:this.model.message}));
    //console.log(this.http.get("http://chrisandrachelwedding.atwebpages.com/").toPromise().then(response => response.json().data));
    this.http.post("http://chrisandrachelwedding.atwebpages.com/insert.php",JSON.stringify({name:this.model.name, email: this.model.email, message:this.model.message}), {headers:headers}).subscribe(res => console.log(res.text()));

    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}