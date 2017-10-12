import {Directive, ElementRef, OnInit, Renderer} from '@angular/core';

export class lightval {
  x: number = 0;
  y: number = 0;
  r: number = 0;
  g: number = 0;
  b: number = 0;
  a: number = 0;
  rad: number = 0;
  vx: number = 0;
  vy: number = 0;
  inc: boolean = true;
  step: number = 1.0;
  rstep: number = 1.0;
  decay: number = 0;
  constructor(x: number, y: number, r: number, g: number, b: number,){
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  finished(){
      let t1: boolean = this.a == 0;
      if (t1 && !this.inc){
          return true;
      }
      else{
          return false;
      }
  }
  moveAlpha(){
     this.a = ((this.a*this.decay+this.step))/this.decay;
     if (this.a >= 1.0){
         this.a = 1.0;
         this.step = -1.0*this.step;
     }
     if (this.a <= 0.0){
         this.a = 0.0;
         this.step = -1.0*this.step;
     }
  }

  movePosition(){
      this.x = ((this.vx * 1.0/this.decay + this.x));
      this.y = ((this.vy * 1.0/this.decay + this.y));

      if (this.y <= 0.0){
        this.vy = -1.0*this.vy;
      }
      if (this.x <= 0.0){
        this.vx = -1.0*this.vx;
      }      
      if (this.y >= window.innerHeight){
        this.vy = -1.0*this.vy;
      }
      if (this.x >= window.innerWidth){
        this.vx = -1.0*this.vx;
      }
  }
  
  moveRad(minRad: number, maxRad: number){
     this.rad = ((this.rad*this.decay+this.rstep))/this.decay;
     if (this.rad >= maxRad){
        this.rad = maxRad;
        this.rstep = -1.0*this.rstep;
    }
    if (this.rad <= minRad){
        this.rad = minRad;
        this.rstep = -1.0*this.rstep;
    }
  }
}

@Directive({
  selector: '[anim-directive]',
})
export class LightsAnimDirective implements OnInit{
    private canvas: any;
    private lightvals: lightval[] = [];
    private decaytime: number = 10.0;  //in seconds
    private erad: number = 7.0;
    private totalpop: number = 100;
    private maxRad: number = 20.0;
    private minRad: number = 3.0;
    private maxvelocity: number = 200.0;
    constructor(private el: ElementRef, private renderer: Renderer) {
        this.canvas = el.nativeElement;
        console.log("hitting directive!");
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        
    }

    ngOnInit() {
        //console.log("GartDataDirective ngOnInit: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors);
        //this.populateDataChart();
        console.log("hitting directive!");
        requestAnimationFrame(() => this.draw());
       
    }
    private draw() {
        let c: CanvasRenderingContext2D = this.canvas.getContext('2d');
        c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //check values continue thru then delete old values that need be discarded
        var i = 0;
        
        var dkeys: number[] = [];
        for (let lval of this.lightvals){

                lval.moveAlpha();
                lval.movePosition();
                lval.moveRad(this.minRad, this.maxRad);
                c.beginPath();
                let l = 'rgb(' + Math.floor(lval.r) + ', ' + Math.floor(lval.b) + ', ' + Math.floor(lval.g) + ')';
        
                
                c.fillStyle = l;
                c.globalAlpha = lval.a;
                c.ellipse(lval.x, lval.y, lval.rad, lval.rad, 1, 0, 2.0 * Math.PI);
                c.fill();
                
      
        }


        
        if (this.lightvals.length < this.totalpop){
            let r = Math.random()*255.0;
            let g = Math.random()*255.0;
            let b = Math.random()*255.0;
            let x = Math.random()*this.canvas.width;
            let y = Math.random()*this.canvas.height;
            let vx = Math.random()*this.maxvelocity-this.maxvelocity/2.0;
            let vy = Math.random()*this.maxvelocity-this.maxvelocity/2.0;
            let nlval: lightval = new lightval(x,y,r,g,b);
            nlval.vx = vx;
            nlval.vy = vy;
            nlval.rad = this.erad;
            nlval.decay = (2.0+Math.random()*this.decaytime)*30.0; //30 frames per second 
            this.lightvals.push(nlval);
        }
        requestAnimationFrame(() => this.draw());
        //no draw since instancing 0 alpha object
    }
}