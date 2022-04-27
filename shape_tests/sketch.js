
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

const randomRGBVal = () => {
  return Math.floor(Math.random() * 255);
}

const visibleGray = () => {
  return Math.floor(Math.random() * 240);
}

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

const corner = (cornerPoint, sideLength, fromCenter, angle, lineColor = 'black') => {
  // angle from corner to each end point
  let rad1 = degreesToRadians(angle - 135);
  let rad2 = degreesToRadians(angle + 135);

  // 90 degree angled lines are not long enough
  if (angle === 0) {
    cornerPoint.x += sideLength * 3;
  } else if (angle === 45) {
    cornerPoint.x += fromCenter;
    cornerPoint.y += fromCenter;
  } else if (angle === 90) {
    cornerPoint.y += sideLength * 3;
  } else if (angle === 135) {
    cornerPoint.x -= fromCenter;
    cornerPoint.y += fromCenter;
  } else if (angle === 180) {
    cornerPoint.x -= sideLength * 3;
  } else if (angle === 225) {
    cornerPoint.x -= fromCenter;
    cornerPoint.y -= fromCenter;
  } else if (angle === 270) {
    cornerPoint.y -= sideLength * 3;
  } else if (angle === 315) {
    cornerPoint.x += fromCenter;
    cornerPoint.y -= fromCenter;
  }

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

const drawX = (middlePoint, sideLength, fromCenter, shortSide, angle, lineColor = 'black') => {
  // angle from middle to each end point
  if (angle === undefined) {
    angle = angles[Math.floor(Math.random() * 8)];
  }
  let rad1 = degreesToRadians(angle + 45);
  let rad2 = degreesToRadians(angle + 135);

  // 90 degree angled lines are not long enough
  if (angle === 0) {
    middlePoint.x += sideLength * 2;
  } else if (angle === 45) {
    middlePoint.x += fromCenter;
    middlePoint.y += fromCenter;
  } else if (angle === 90) {
    middlePoint.y += sideLength * 2;
  } else if (angle === 135) {
    middlePoint.x -= fromCenter;
    middlePoint.y += fromCenter;
  } else if (angle === 180) {
    middlePoint.x -= sideLength * 2;
  } else if (angle === 225) {
    middlePoint.x -= fromCenter;
    middlePoint.y -= fromCenter;
  } else if (angle === 270) {
    middlePoint.y -= sideLength * 2;
  } else if (angle === 315) {
    middlePoint.x += fromCenter;
    middlePoint.y -= fromCenter;
  }
  let x1, x2, x3, x4, y1, y2, y3, y4;
  // angles are going clockwise??
  if (angle % 45 === 0) {
    x1 = shortSide * Math.cos(rad1) + middlePoint.x;
    y1 = shortSide * Math.sin(rad1) + middlePoint.y;
    x2 = -shortSide * Math.cos(rad1) + middlePoint.x;
    y2 = -shortSide * Math.sin(rad1) + middlePoint.y;

    x3 = shortSide * Math.cos(rad2) + middlePoint.x;
    y3 = shortSide * Math.sin(rad2) + middlePoint.y;
    x4 = -shortSide * Math.cos(rad2) + middlePoint.x;
    y4 = -shortSide * Math.sin(rad2) + middlePoint.y;
  } else if (angle % 90 === 0) {
    x1 = shortSide * Math.cos(rad1) + middlePoint.x;
    y1 = shortSide * Math.sin(rad1) + middlePoint.y;
    x2 = x1;
    y2 = y1 - shortSide * 2;

    x3 = shortSide * Math.cos(rad2) + middlePoint.x;
    y3 = shortSide * Math.sin(rad2) + middlePoint.y;
    x4 = x3 + shortSide * 2;
    y4 = y3;
  }



  stroke(lineColor);
  line(x1, y1, x2, y2);
  line(x3, y3, x4, y4);

};

const angleLine = (start, radius, short, angle, lineColor = 'black') => {
  // clockwise angles??
  // let distance = hypotenuse(start, length)
  // angle = Math.floor(Math.random() * 360);
  let rads = degreesToRadians(angle);

  let dist = Math.random() > 0.4 ? (radius * 2) : short;

  let x1 = radius * Math.cos(rads) + start.x;
  let y1 = radius * Math.sin(rads) + start.y;

  let x2 = dist * Math.cos(rads) + x1;
  let y2 = dist * Math.sin(rads) + y1;  

  stroke(lineColor);
  line(x1, y1, x2, y2);

}

const crossLine = (start, radius, shortAngle, angle, lineColor = 'black') => {
  if (angle === undefined) {
    angle = angles[Math.floor(Math.random() * 8)];
  }
  let rads = degreesToRadians(angle);
  let rads2 = degreesToRadians(angle + 90);
  let x1 = (radius + shortAngle) * Math.cos(rads) - (shortAngle * Math.cos(rads2)) + start.x;
  let y1 = (radius + shortAngle) * Math.sin(rads) - (shortAngle * Math.sin(rads2)) + start.y;

  let x2 = shortAngle * 2 * Math.cos(rads2) + x1;
  let y2 = shortAngle * 2 * Math.sin(rads2) + y1;  
  
  stroke(lineColor);
  line(x1, y1, x2, y2);
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
let radiusHyp = Math.sqrt(radius * radius * 2);
let longAngle = Math.sqrt((diameter * diameter) / 2);
let toCorner = shortAngle + longAngle;
let shortLine = shortAngle * 2;
let ringChance = 0.75;

let counter = 0;
let grayscaleVal = counter;
let r, g, b;

function drawShapes () {
  for (let y = 20; y <= cWidth - 20; y += 40) {
    for (let x = 20; x <= cHeight - 20; x += 40) {
      let crossLineFlag = false;
      let cornerFlag = false;
      //grayscaleVal = visibleGray();
      r = Math.floor(counter);
      g = randomRGBVal();
      b = Math.ceil(255 - counter);
      colorVal = 'rgb(' + r + ',' + g + ',' + b + ')';
      let point = createVector(x, y);
      let angle1 = angles[Math.floor(Math.random() * angles.length)];
      let angle2 = angles[Math.floor(Math.random() * angles.length)];
      if (Math.random() < ringChance) {
        ring({x: x, y: y}, 20, colorVal);
      }
      if(Math.random() < 0.68) {
        crossLineFlag = true;
        crossLine({x: x, y: y}, radius, shortAngle, undefined, colorVal);
        if(Math.random() < 0.38) {
          crossLine({x: x, y: y}, radius, shortAngle, undefined, colorVal);
          if(Math.random() < 0.35) {
            crossLine({x: x, y: y}, radius, shortAngle, undefined, colorVal);
            if(Math.random() < 0.35) {
              crossLine({x: x, y: y}, radius, shortAngle, undefined, colorVal);
            }
          }
        }
      }
      if (Math.random() < 0.6) {
        cornerFlag = true;
        corner({x: x, y: y}, radius, toCorner, angle1, colorVal);
        if (Math.random() < 0.33) {
          corner({x: x, y: y}, radius, toCorner, angle1, colorVal);
        }
      }
      if (!cornerFlag && !crossLineFlag) {
        drawX({x: x, y: y}, radius, shortLine, shortAngle, undefined, colorVal);
      }
      angleLine({x: x, y: y}, radius, shortAngle, 
        Math.random() > 0.6 ? angle1 : angle2, colorVal);

      counter += 0.5;
    }
  }
}

