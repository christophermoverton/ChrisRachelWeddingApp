import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnChanges } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { Ceremony } from './ceremony.component';
import { Celebration} from './celebration.component';
import { routerTransition } from './router.animations';
import { GuestFormComponent} from './guest-form.component';
import { Guestbook } from './guestbook.component';
import {
  
    Input,
    trigger,
    state,
    style,
    transition,
    animate
  } from '@angular/core';
  import { AppRouting } from './app.routing';

  @Component({
    moduleId: module.id,
    selector: 'my-app',
  templateUrl: './app.module.html',
  
    styleUrls: ['./app.module.css'],
  
  animations: [
    trigger('visibilityChanged', [
      state('shown' , style({ opacity: 1 })), 
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('2.0s'))
    ])
  ]
  
  })

export class App implements OnChanges{
  public edited = true;
  public visibility = 'hidden';
  @Input() isVisible: boolean = false;
scan() {
    this.edited = true;
    this.isVisible = !this.isVisible;
    this.visibility = this.isVisible ? 'shown' : 'hidden';
       //wait 3 Seconds and hide
       
 setTimeout(function() {
     this.edited = false;
     this.isVisible = !this.isVisible;
     this.visibility = this.isVisible ? 'shown' : 'hidden';
     console.log(this.edited);
 }.bind(this), 3000);
}

ngOnChanges() {
 this.visibility = this.isVisible ? 'shown' : 'hidden';
}
}


//import { Component, NgModule, OnChanges } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { FormsModule }   from '@angular/forms';

//import { AppComponent }  from './app.component';
//import {GartComponent, GartDataDirective} from "./gart.component";

//import { Home, TrackScrollComponent } from './home.component';


@NgModule({
  imports: [
    BrowserModule, AppRouting, FormsModule
  ],
  declarations: [
    App, AppComponent, Ceremony, Celebration, GuestFormComponent, Guestbook
  ],
 
  providers: [],
  bootstrap: [App]
})

export class AppModule { }