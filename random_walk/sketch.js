// global variables (shrug emoji)
let cWidth = 400;
let cHeight = 400;


class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    // never eat soggy waffles walking
    let direction = Math.floor(random(0, 4));
    switch (direction) {
      case 0:
        if (this.y > 0) {
          this.y--;
        }
        break;
      case 1:
        if (this.x < cWidth) {
          this.x++;
        }
        break;
      case 2:
        if (this.y < cHeight) {
          this.y++;
        }
        break;
      case 3:
        if (this.x > 0) {
          this.x--;
        }
        break;
      default:
        // no default, or wrong things happened
        console.log('Walk default!?');
        break;
    }
  }
}

let w1 = new Walker(cWidth/2, cHeight/2);
let w2 = new Walker(cWidth/4, cHeight/4);
let w3 = new Walker(cWidth * 0.75, cHeight * 0.75);

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
  w2.step();
  w2.display();
  w3.step();
  w3.display();
}
