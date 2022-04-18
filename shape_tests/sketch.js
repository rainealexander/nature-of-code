
const cWidth = 800;
const cHeight = 800;

// ____________________
// | Helper functions |
// `------------------'

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI/180);
};

const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const hypotenuse = (point1, point2) => {
  let a = Math.abs(point1.x - point2.x);
  let b = Math.abs(point1.y, point2.y);
  return Math.sqrt(a * a + b * b);
};

// ___________________
// | Shape functions |
// `-----------------'

const ring = (origin, diameter, lineColor = 'black', fill = false, fillColor = 'black') => {
  
  noFill();
  if (fill) {
    fill(fillColor);
  }
  strokeWeight(3);
  stroke(lineColor);
  circle(origin.x, origin.y, diameter);
};

const corner = (cornerPoint, sideLength, angle, lineColor = 'black') => {
  // angle from corner to each end point
  let rad1 = degreesToRadians(angle + 180);
  let rad2 = degreesToRadians(angle - 90);

  let x1 = sideLength * Math.cos(rad1) + cornerPoint.x;
  let y1 = sideLength * Math.sin(rad1) + cornerPoint.y;

  let x2 = sideLength * Math.cos(rad2) + cornerPoint.x;
  let y2 = sideLength * Math.sin(rad2) + cornerPoint.y;

  noFill();
  stroke(lineColor);
  beginShape();
  vertex(x1, y1);
  vertex(cornerPoint.x, cornerPoint.y);
  vertex(x2, y2);
  endShape();

};

const angleLine = (start, length, angle) => {

}

// _____________________
// | Setup and Drawing |
// `-------------------'

function setup() {
  createCanvas(cWidth, cHeight);
  background(255);
  drawShapes();
}

function drawShapes () {
  for (let x = 20; x <= cWidth - 20; x += 40) {
    for (let y = 20; y <= cHeight - 20; y += 40) {
      ring({x: x, y: y}, 20);
      corner({x: x + 20, y: y - 20}, 10, -90);
    }
  }
}

