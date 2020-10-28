//declare variables
let mySong;
let analyzer;
let vol = 0;
let myImage;
let myText;
let myCircle = [];

//preload sound and images
function preload() {
  mySong = loadSound("./assets/equilibrium.mp3");
  myImage = loadImage("./assets/relax.png");
}

//play-pause mouse Click
function mouseClicked() {
  if (mySong.isPlaying() == false) {
      mySong.play();
      } else {
        mySong.stop();
        }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //set the analyzer up
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  // get the volume and remap it
  vol = analyzer.getLevel();
  vol = map(vol, 0, 1, 0, 300);
  //fill array
  for(let i = 0; i < 15; i++) { //loop 15 times
  //put an object in the array for each loop
  myCircle[i] = new Circles (width/2, height/2, vol*10);
  noStroke();
  }
}

function draw() {
background("white");
//conditions with music playing
  if (mySong.isPlaying() == false) {
      //instructions for the user
      myText = "click to play";
      textFont("Syne Mono");
      textAlign(CENTER);
      textSize(20);
      fill(0);
      text(myText, width/2, height/10);
      //"welcome image"
      image(myImage, width/2, height/2);
      imageMode(CENTER);
      } else {
        //instructions for the user
        myText = "click to stop";
        textFont("Syne Mono");
        textAlign(CENTER);
        textSize(20);
        fill(0);
        text(myText, width/2, height/10);
      }
//for circles to be on screen only when music is playing
  if (mySong.isPlaying() == true){
    for (let i = 0; i < 15; i++){ //loop 5 times
    myCircle[i].display();
    myCircle[i].move();
    }
  }
}

class Circles {
//the constructor
    constructor(x, y, w) { //3 arguments
    this.x = x;
    this.y = y;
    this.w = w;
    this.color = "crimson";
    this.n = random(vol-20, vol+20);//random noise variable;
    this.p = 0; //position
    this.inc = 0.005; //noise increment
  }

//functions
  display() {
    fill(255, 0, 0, 100);
    ellipse(this.x, this.y, this.w);
 	  this.w += random(-1, 1);
  }
  move() {
   this.p = noise (this.n);
   this.x = map (this.p, 0, 1, 0, width);
   this.n = this.n + this.inc;
  }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight)
}
