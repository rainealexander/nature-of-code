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
    stroke(0);
    color(255, 255, 255, 31);
    // error here - rect takes x, y, width, height
    rect(this.x, this.y, this.x + 10, this.y + 10);
  }

  step() {
    // eight directional walk
    let xDir = Math.floor(random(-1, 2)) * 10; // -10, 0, or 10
    let yDir = Math.floor(random(-1, 2)) * 10;

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

console.log(`cWidth: ${cWidth} cHeight: ${cHeight}`);

function draw() {
  // put drawing code here
  w1.step();
  w1.display();
  // w2.step();
  // w2.display();
  // w3.step();
  // w3.display();
}
