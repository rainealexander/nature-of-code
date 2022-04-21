
// ____________________
// | Global Variables |
// `------------------'

const cWidth = 800;
const cHeight = 800;

const angles = [0, 45, 90, 135, 180, 225, 270, 315];

// ____________________
// | Helper functions |
// `------------------'

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI/180);
};

const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// hypotenuse length for 45 degree angle
const hypotenuse = (coords, sideLength) => {
  let rad = degreesToRadians(45);
  let x1 = sideLength * Math.cos(rad) + coords.x;
  let y1 = sideLength * Math.sin(rad) + coords.y;
  let a = Math.abs(coords.x - x1);
  let b = Math.abs(coords.y - y1);
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
  let rad1 = degreesToRadians(angle - 135);
  let rad2 = degreesToRadians(angle + 135);

  // angles are going clockwise??
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

const angleLine = (start, length, dist, angle) => {
  // clockwise angles??
  // let distance = hypotenuse(start, length)
  let x2, y2;
  if (angle === 45) {
    start.x += dist;
    start.y += dist;
    x2 = start.x + length;
    y2 = start.y + length;
  } else if (angle === 135) {
    start.x -= dist;
    start.y += dist;
    x2 = start.x - length;
    y2 = start.y + length;
  } else if (angle === 225) {
    start.x -= dist;
    start.y -= dist;
    x2 = start.x - length;
    y2 = start.y - length;
  } else if (angle === 315) {
    start.x += dist;
    start.y -= dist;
    x2 = start.x + length;
    y2 = start.y - length;
  }
  line(start.x, start.y, x2, y2);

}

// _____________________
// | Setup and Drawing |
// `-------------------'

function setup() {
  createCanvas(cWidth, cHeight);
  background(255);
  drawShapes();
}

let radius = 10;
let diameter = radius * 2;
// length of short side of isosceles right triangle
let shortAngle = Math.sqrt((radius * radius) / 2);
let longAngle = Math.sqrt((diameter * diameter) / 2);
let ringChance = 0.85;

function drawShapes () {
  for (let x = 20; x <= cWidth - 20; x += 40) {
    for (let y = 20; y <= cHeight - 20; y += 40) {
      let angle1 = angles[Math.floor(Math.random() * angles.length)];
      if (Math.random() < 0.75) {
        ring({x: x, y: y}, 20);
      }
      corner({x: x + (shortAngle + longAngle), y: y - (shortAngle + longAngle)}, radius, angle1);
      angleLine({x: x, y: y}, longAngle, shortAngle, angle1);
    }
  }
}

