// Code supplied by Daniel Shiffman of CODING TRAIN with modifications
// by Meghan Harris
var PI = 3.14;
var angle = PI / 4;
// var slider;
var tree = [];
var leaves = [];
var count = 0;

// HTML5 Canvas has been created
function setup() {
  createCanvas(400, 400);
  // Create vectors for points
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 100);
  // add a slider to the canvas
  // slider = createSlider(0, TWO_PI, PI / 4, 0.01);
  // Branch
  var root = new Branch(a, b);
  tree[0] = root;
}

function mousePressed() {
  for (var i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
      tree[i].finished = true;
    }
  }
  count++;
  if (count === 5) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
  // tree[1] = tree[0].branchA();
  // tree[2] = tree[0].branchB();
}

// Drawing to canvas
function draw() {
  // Add a background
  background(51);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
    // tree[i].jitter();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(255, 0, 100, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
    leaves[i].y += random(0, 2);
    // tree[i].jitter();
  }
  // angle = slider.value();

  // Make tree trunk
  // stroke(255);
  // Move tree origin to 0, 0
  // translate(200, height);
}

// Make Branches Recursively
// function branch(len) {
//   // draw a line from 0 to straight up
//   line(0, 0, 0, -len);
//   translate(0, -len);

//   if (len > 4) {
//     // Push save the transformation state
//     push();
//     rotate(angle);
//     branch(len * 0.67);
//     // Pop restores the previous state
//     pop();
//     push();
//     rotate(-angle);
//     branch(len * 0.67);
//     pop();
//   }
//   //   line(0, 0, 0, -len * 0.67);
// }
