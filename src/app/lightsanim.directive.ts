import {Directive, ElementRef, OnInit, OnChanges,Renderer, Input} from '@angular/core';

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
  ax: number = 0;
  ay: number = 0;
  inc: boolean = true;
  step: number = 1.0;
  rstep: number = 1.0;
  decay: number = 0;
  xhistory: number[] = [];
  yhistory: number[] = [];//[0,0,0,0,0,0,0,0,0,0];
  radhistory: number[] = [];//[0,0,0,0,0,0,0,0,0];
  totalhistory: number = 5;
  eleheight: number = 0;
  elewidth: number = 0;
  
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

  computeaccel(F: number[], Fx: number[], Fy: number[]){
    var sumFx: number = 0.0;
    var sumFy: number = 0.0;
    var sumRx: number = 0.0;
    var sumRy: number = 0.0;
    for (let i = 0; i < F.length; i++){
        let fx = Fx[i];
        let fy = Fy[i];
        let f = F[i];
        sumRx += fx-this.x;
        sumRy += fy-this.y;
        //let r = Math.pow((fx - this.x)*(fx-this.x) +(fy-this.y)*(fy-this.y),0.5);
        let theta = Math.atan2((fy-this.y),(fx-this.x)); //in radians
        sumFx += Math.cos(theta)*f;
        sumFy += Math.sin(theta)*f;
    }
    //let r = Math.pow((Fx - this.x)*(Fx-this.x) +(Fy-this.y)*(Fy-this.y),0.5);
    //let a =  F/(r) - Math.random()*F/r;//frictional damping randomized
    //let theta = Math.atan2((Fy-this.y),(Fx-this.x)); //in radians
    this.ax = sumFx/sumRx;//Math.cos(theta)*a;
    this.ay = sumFy/sumRy;//Math.sin(theta)*a;
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
      this.x = ((0.5*this.ax*(1.0/this.decay)*(1.0/this.decay)+this.vx * 1.0/this.decay + this.x));
      this.y = ((0.5*this.ay*(1.0/this.decay)*(1.0/this.decay)+this.vy * 1.0/this.decay + this.y));
      this.vx = this.ax*(1.0/this.decay)+this.vx;
      this.vy = this.ay*(1.0/this.decay)+this.vy;

      if (this.y <= 0.0){
        this.vy = -1.0*this.vy;
      }
      if (this.x <= 0.0){
        this.vx = -1.0*this.vx;
      }
           
      if (this.y >= this.eleheight){
        this.vy = -1.0*this.vy;
      }
      if (this.x >= screen.width){
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

  moveHistory(){
      if (this.xhistory.length > this.totalhistory){
        this.xhistory.shift();
        this.xhistory.push(this.x);
      }
      else{
          this.xhistory.push(this.x);
      }
      if (this.yhistory.length > this.totalhistory){
        this.yhistory.shift();
        this.yhistory.push(this.y);
      }
      else{
          this.yhistory.push(this.y);
      }
      if (this.radhistory.length > this.totalhistory){
          this.radhistory.shift();
          this.radhistory.push(this.rad);
      }
      else{
          this.radhistory.push(this.rad);
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
    private totalpop: number = 40;
    private maxRad: number = 40.0;
    private minRad: number = 3.0;
    private maxvelocity: number = 10.0;
    private Force: number[] = [10000.0];
    private maxAlpha: number = 0.6;
    private Fx: number[] = [0.0];
    private Fy: number[] = [0.0];
    private height: number = 0.0;
    @Input('widthmult') widthmult: number = 1.0;
    @Input('heightmult') heightmult: number = 1.0;

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.canvas = el.nativeElement;

        
    }

    ngOnInit() {
        //console.log("GartDataDirective ngOnInit: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors);
        //this.populateDataChart();
        console.log("hitting directive!");
        var body = document.body,
        html = document.documentElement;
        this.height = document.documentElement.scrollHeight+window.innerHeight;
            console.log(this.height);
            console.log(window.outerHeight);
            console.log(body.scrollHeight);
            console.log(screen.height);
            console.log(document.documentElement.scrollHeight);
            console.log(this.widthmult);
        this.canvas.height = this.height*this.heightmult;
        this.canvas.width = window.innerWidth*this.widthmult;
              
        for (let i = 0; i < 10; i++){
            this.Fx.push(Math.random()*window.outerWidth);
            this.Fy.push(Math.random()*this.height*this.heightmult);
            this.Force.push(2000);
        }
        requestAnimationFrame(() => this.draw());
       
    }

    ngOnChange(){
        
        var body = document.body,
        html = document.documentElement;
        var height = document.documentElement.scrollHeight+window.innerHeight;
        console.log(height);
        console.log(window.outerHeight);
        console.log(body.scrollHeight);
        console.log(screen.height);
        console.log(document.documentElement.scrollHeight);
    this.canvas.height = height*this.heightmult;
    this.canvas.width = window.innerWidth*this.widthmult;
        
        for (let i = 0; i < 10; i++){
            this.Fx.push(Math.random()*window.innerWidth*this.widthmult);
            this.Fy.push(Math.random()*height*this.heightmult);
            this.Force.push(2000);
        }
    }

    private draw() {
        let c: CanvasRenderingContext2D = this.canvas.getContext('2d');
        c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //check values continue thru then delete old values that need be discarded
        var i = 0;
        
        var dkeys: number[] = [];
        for (let lval of this.lightvals){
                lval.computeaccel(this.Force, this.Fx, this.Fy);
                lval.moveAlpha();
                lval.movePosition();
                lval.moveRad(this.minRad, this.maxRad);
                lval.moveHistory();
                c.beginPath();
                let l = 'rgb(' + Math.floor(lval.r) + ', ' + Math.floor(lval.b) + ', ' + Math.floor(lval.g) + ')';
        
                
                c.fillStyle = l;
                c.globalAlpha = this.maxAlpha*lval.a;
                c.ellipse(lval.x, lval.y, lval.rad, lval.rad, 1, 0, 2.0 * Math.PI);
                c.fill();
                var k = 0;
                for (let hx of lval.xhistory){
                    let hy = lval.yhistory[k];
                    let nrad = lval.radhistory[k];
                    c.beginPath();

                    c.globalAlpha = this.maxAlpha*lval.a*(k/(3.0*lval.xhistory.length));
                    c.ellipse(hx, hy, nrad, nrad, 1, 0, 2.0 * Math.PI);
                    c.fill();                    
                    k+=1;
                }
                
      
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
            nlval.eleheight = this.canvas.height;
            nlval.elewidth = this.canvas.width;
            this.lightvals.push(nlval);
        }
        requestAnimationFrame(() => this.draw());
        //no draw since instancing 0 alpha object
    }
}