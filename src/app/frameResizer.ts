import {PVector} from './lineData';

export class frameResizer{
    baseWidth: number;
    baseHeight: number;
    frameWidth: number;
    frameHeight: number;
    offsetDiff: number = 50.0;
    scalef: number;
    constructor(frameh: number, framew: number){
        this.baseWidth = 1366.0;
        this.baseHeight = 768.0;
        this.frameWidth = framew;
        this.frameHeight = frameh;
        this.scalef = window.innerWidth/this.baseWidth;

    }
    
    public getHeight(): number{
        this.checkScalef();
        return this.frameHeight * this.scalef
        //note doing this to maintain aspect fit...otherwise, may have
        //scale stretching/contraction of the element container.  
    }

    public getWidth(): number{
        this.checkScalef();
        return this.frameWidth * this.scalef;
    }

    public getPosition(top: number, left: number): PVector{
        this.checkScalef();
        let newopos = new PVector(top,left);
        let snewopos = newopos.multiply(this.scalef);
        console.log(snewopos);
        return snewopos;
        //console.log(snewopos.add(new PVector(this.baseHeight/2.0, this.baseWidth/2.0)));
        //return snewopos.add(new PVector(this.baseHeight/2.0, this.baseWidth/2.0));
    }

    public getPositionrefactor(top: number, left: number, fallofffactor: number){
        this.checkScalef();
        let newopos = new PVector(top,left);
        let snewopos = newopos.multiply(Math.pow(this.scalef,fallofffactor));
        console.log(snewopos);
        return snewopos;    
    }

    public getTextResize(weight: number): number{
        this.checkScalef();
        console.log("Scalef:");
        console.log(this.scalef);
        console.log(weight*this.scalef);
        return weight*this.scalef;
    }

    public getScreenResize(weight: number): number{
        this.checkScalef();
        console.log("Scalef:");
        console.log(this.scalef);
        console.log(weight*this.scalef); 
        let offset = 50.0 - (window.innerWidth - weight*this.scalef);
        return weight*this.scalef - offset;
    }

    public checkScalef(){
        console.log("screen width:");
        console.log(window.innerWidth);
        this.scalef = window.innerWidth/this.baseWidth;
    }

    public getScale(){
        return this.scalef;
    }

}