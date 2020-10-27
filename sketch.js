let mySong;
let analyzer;

let pulse=[];

let vol = 0;

let myText;

function preload(){
  mySong = loadSound("/David_Hilowitz_-_Equilibrium_I_Cello_version.mp3");
}

function mouseClicked() {
  if (mySong.isPlaying() == false) {
      mySong.play();
    }  else {
        mySong.stop();
      }}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  // get the volume and remap it to a bigger value
  vol = analyzer.getLevel();
  vol = map(vol,0,1,0,300);
  //fill array
  for(let i=0;i<15;i++){ //loop 5 times
  //put an object in the array for each loop
  pulse[i] = new Pulser(width/2, height/2, vol*10);
  noStroke();
  }
}

function draw() {

  background(255);

  if (mySong.isPlaying() == false) {
      myText = "click to play"
      textFont("Courier");
      textAlign(CENTER);
      textSize(20);
      fill(0);
      text(myText, width/2, height/10);
    }  else {
        myText = "click to stop"
        textFont("Courier");
        textAlign(CENTER);
        textSize(20);
        fill(0);
        text(myText, width/2, height/10);

      }

  if(mySong.isPlaying() == true){
  for(let i=0;i<15;i++){ //loop 5 times
    pulse[i].display();
    pulse[i].move();
  }
  }
}

class Pulser {
    constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.color = "red";
    this.n=random(vol-20, vol+20);//random noise variable;
    this.p=0; //position
    this.inc=0.005; //noise increment
  }

  display() {
    fill(255, 0, 0,100);
    ellipse(this.x, this.y, this.w);
 	  this.w += random(-1, 1);
  }

  move() {
   this.p=noise(this.n);
   this.x=map(this.p,0,1,0,width);
   this.n=this.n+this.inc;
  }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight)
}
