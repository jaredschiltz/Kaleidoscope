let img
let shape
let maskedImage;
let theta = 0;
const SIZE = 800;
const SIZE_DIV2 = SIZE / 2;
let shapeWidth;
let shapeHeight;

function preload() {
  img = loadImage('https://picsum.photos/' + str(SIZE))
}

function setup() {
  createCanvas(SIZE, SIZE);
  // Create new p5 graphics object
  shapeWidth = SIZE_DIV2;
  shapeHeight = SIZE / 2 * Math.tan(PI / 8);
  shape = createGraphics(shapeWidth, shapeHeight);
  maskedImage = createImage(int(shapeWidth), int(shapeHeight))
}

function draw() {

  background(0);
  push();
  translate(SIZE / 2, 0)
  rotate(theta)
  image(img, -SIZE_DIV2, -SIZE_DIV2)
  pop();
  maskedImage.loadPixels()
  for (let r = 0; r < shapeHeight; r++) {
    for (let c = 0; c < shapeWidth; c++) {
      maskedImage.set(c, r, get(c, r));
    }
  }
  maskedImage.updatePixels()

  // Draw the shape
  noStroke();
  shape.fill(0);
  shape.beginShape();
  shape.vertex(0, 0);
  shape.vertex(shapeWidth, 0);
  shape.vertex(shapeWidth, shapeHeight);
  shape.endShape(CLOSE);
  // Use the shape as a mask
  maskedImage.mask(shape)

  fill(0);
  rect(0,0,SIZE,SIZE)

  push()
  translate(SIZE / 2, SIZE / 2)
  for (let numAngles = 0; numAngles < 8; numAngles++) {
    rotate(-PI / 4 * numAngles)
    image(maskedImage, 0, 0)
  }
  pop()

  push()
  scale(1, -1)
  translate(SIZE / 2, -SIZE / 2)
  for (let numAngles = 0; numAngles < 8; numAngles++) {
    rotate(-PI / 4 * numAngles)
    image(maskedImage, 0, 0)
  }
  pop()

  theta = theta + 0.01
  if (theta >= 2 * PI) {
    theta = 0;
  }
}
