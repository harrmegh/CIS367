var tree;
var maximumDistance = 100;
var minimumDistance = 10;

function setup() {
  createCanvas(400, 400);
  tree = new Tree();
}

function draw() {
  background(51);
  tree.show();
  tree.grow();
}
