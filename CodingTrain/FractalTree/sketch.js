// Code supplied by Daniel Shiffman of CODING TRAIN with modifications
// by Meghan Harris

var angle = PI / 4;
var slider;

// HTML5 Canvas has been created
function setup() {
  createCanvas(400, 400);
  // add a slider to the canvas
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

// Drawing to canvas
function draw() {
  // Add a background
  background(51);

  //
  angle = slider.value();

  // Make tree trunk
  stroke(255);

  // Move tree origin to 0, 0
  translate(200, height);
  // Branch
  branch(100);
}

// Make Branches
function branch(len) {
  // draw a line from 0 to straight up
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 4) {
    // Push save the transformation state
    push();
    rotate(angle);
    branch(len * 0.67);
    // Pop restores the previous state
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
  //   line(0, 0, 0, -len * 0.67);
}
