// global variables (shrug emoji)
let cWidth = 400;
let cHeight = 400;


class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    // change to 10 x 10 box for visibility
    noStroke();
    // add alpha value to show overlapping visits
    fill(0, 0, 0, 31);
    rect(this.x, this.y, 10, 10);
  }

  step() {
    // eight directional walk
    let xDir = Math.floor(random(-1, 2)) * 10; // -10, 0, or 10
    let yDir = Math.floor(random(-1, 2)) * 10;

    console.log(`xDir: ${xDir} yDir: ${yDir}`);
    console.log(`this.x: ${this.x} this.y: ${this.y}`);

    this.x += xDir;
    this.y += yDir;

    // lets wrap around if we go "off screen"
    if (this.x < 0) {
      this.x = cWidth;
    } else if (this.x > cWidth) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = cHeight;
    } else if (this.y > cHeight) {
      this.y = 0;
    }

    this.display();
  }
}

let w1 = new Walker(cWidth/2, cHeight/2);
// let w2 = new Walker(cWidth/4, cHeight/4);
// let w3 = new Walker(cWidth * 0.75, cHeight * 0.75);

function setup() {
  // put setup code here
  createCanvas(cWidth, cHeight);
  background(255);
}

function doStuff() {
  setInterval(() => { w1.step();}, 50);
}

doStuff();
