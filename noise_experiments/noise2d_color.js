let cWidth = 400;
let cHeight = 400;

function makeNoise() {
  let xOffset = 0;

  for (let x = 0; x < cWidth; x++) {
    let yOffset = 0;

    for (let y = 0; y < cHeight; y++) {
      let hue = map(noise(xOffset, yOffset), 0, 1, 0, 360);
      stroke(hue, 100, 50);
      point(x, y);
      yOffset += 0.01;
    }

    xOffset += 0.01;
  }
}


function setup() {
  createCanvas(cWidth, cHeight);
  colorMode(HSB);
  makeNoise();
}
