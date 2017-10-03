import { Component } from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';
import { Guest }    from './guest';

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
    framer: frameResizer;
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Guest(18, 'Dr IQ', this.powers[0], 'Hello my name is Jim Bob.\n Been an old friend of shorty there!\n Gratz!');

  submitted = false;
  constructor(){
    this.framer = new frameResizer(1.0,1.0);
    this.rtitleWeight = this.framer.getTextResize(this.titleWeight);
    this.raddressWeight = this.rtitleWeight*0.45;
    this.rlabelWeight = this.labelWeightmult*this.rtitleWeight;
    this.rmapImageSize = this.mapImageSize*this.framer.getScale();
  }
  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}