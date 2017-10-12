var stars = [];
var rockets = [];
var points = [];

var B_NUM = 50;
var timer = 0;

var buildings = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (var i = 0;i<B_NUM;i++) {
    buildings.push(new building());
    buildings[i].start();
  }
  for (var i = 0;i<200;i++) {
    points.push(new pointy());
    points[i].start();
  }
} 

function draw() {
  //background(0,0,0);
  fill(4,50);
  rect(0,0,windowWidth,windowHeight);
  for (var i = 0;i<points.length;i++) {
    points[i].update();
    points[i].show();
  }
  for (var i = 0;i<stars.length;i++) {
    stars[i].update();
    stars[i].show();
    if (stars[i].pos.y>windowHeight) {
      stars.splice(i,1);
    }
  }
  for (var i = 0;i<rockets.length;i++) {
    rockets[i].update();
    rockets[i].show();
    if (rockets[i].pos.y>windowHeight+20) {
      rockets.splice(i,1);
    }
    if (rockets[i].speed.y>0.001) {
      fill(255,random(100));
      ellipse(rockets[i].pos.x,rockets[i].pos.y,random(200,300));
      for (var n = 0; n<random(50,100);n++) {
      	stars.push(new star());
      	stars[stars.length-1].start(rockets[i].pos.x,rockets[i].pos.y,rockets[i].col);
      }
    if (rockets[i].col == 1) {
      background(random(155,255),0,0,25);
    }
    if (rockets[i].col == 2) {
      background(0,random(155,255),0,25);
    }
    
    if (rockets[i].col == 3) {
      background(0,0,random(155,255),25);
    }
    if (rockets[i].col == 4) {
      background(random(155,255),random(155,255),0,25);
    }
    if (rockets[i].col == 5) {
      background(0,random(155,255),random(155,255),25);
    }
    if (rockets[i].col != 1 && rockets[i].col != 2 && rockets[i].col != 3 && rockets[i].col != 4 && rockets[i].col != 5) {
      background(random(155,255),25);
    }
      rockets.splice(i,1);
    }
  }
  if (mouseIsPressed == true || timer%100 == 10) {
    rockets.push(new rocket());
    rockets[rockets.length-1].start();
  }
  for (var i = 0;i<buildings.length;i++) {
    buildings[i].show();
  }
  timer+=10;
}

function rocket() {
  this.start = function() {
    this.pos = new p5.Vector(random(windowWidth),windowHeight);
    this.speed = new p5.Vector(random(-5,5),random(-10,-15));
    this.col = floor(random(1,7));
  }
  this.update = function() {
    this.pos.x+=this.speed.x;
    this.pos.y+=this.speed.y;
    this.speed.y+=0.14;
    
    if (this.pos.x>windowWidth) {
      this.pos.x=windowWidth;
      this.speed.x = this.speed.x*-1;
    }
    if (this.pos.x<0) {
      this.pos.x=0;
      this.speed.x = this.speed.x*-1;
    }
  }
  
  this.show = function() {
    fill(255,255,55);
    noStroke();
    ellipse(this.pos.x,this.pos.y,random(3,5),random(3,5));
    fill(255,255,55,40);
    ellipse(this.pos.x,this.pos.y,random(7,9),random(7,9));
  }
}
function star() {
  this.start = function(posx,posy,rgb) {
    if (rgb == 1) {
      this.col = color(random(155,255),0,0);
    }
    if (rgb == 2) {
      this.col = color(0,random(155,255),0);
    }
    
    if (rgb == 3) {
      this.col = color(0,0,random(155,255));
    }
    if (rgb == 4) {
      this.col = color(random(155,255),random(155,255),0);
    }
    if (rgb == 5) {
      this.col = color(0,random(155,255),random(155,255));
    }
    if (rgb != 1 && rgb != 2 && rgb != 3 && rgb != 4 && rgb != 5) {
      this.col = color(random(155,255));
    }
    this.pos = new p5.Vector(posx,posy);
    this.velocity = new p5.Vector(random(-5,5),random(-5,5));
    this.size = random(2,10);
  }
  
  this.update = function() {
    this.pos.x+=this.velocity.x;
    this.pos.y+=this.velocity.y;
    this.velocity.y+=0.1;
    if (this.pos.x<0) {
      this.pos.x = 0;
      this.velocity.x=this.velocity.x*-1;
    }
    if (this.pos.x>windowWidth) {
      this.pos.x = windowWidth;
      this.velocity.x=this.velocity.x*-1;
    }
    if (this.size>0) {
    	this.size-=0.1;
    }
  }
  
  this.show = function() {
    noStroke();
    fill(this.col,this.lifetime);
    ellipse(this.pos.x,this.pos.y,this.size,this.size);
  }
}

function building() {
  this.start = function() {
  	this.pos = new p5.Vector(random(windowWidth),windowHeight);
  	this.size = new p5.Vector(random(-100,-200),random(-200,300));
  }
  this.show = function() {
    fill(0);
    noStroke();
    rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
  }
}

function pointy() {
  this.start = function() {
    this.pos = new p5.Vector(random(windowWidth),random(windowHeight));
  }
  this.update = function() {
    this.pos.y+=0.05;
    this.pos.x+=0.1;
    if (this.pos.y>windowHeight) {
      this.pos.y = 0;
    }
    if (this.pos.x>windowWidth) {
      this.pos.x = 0;
    }
  }
  this.show = function() {
    stroke(255,random(200));
    strokeWeight(2);
    point(this.pos.x,this.pos.y);
  }
}