// Constructor function for tree
function Tree() {
  this.leaves = [];
  this.branches = [];

  for (var i = 0; i < 400; i++) {
    this.leaves.push(new Leaf());
  }
  var position = createVector(width / 2, height);
  var direction = createVector(0, -1); // Point the branch upward
  var root = new Branch(null, position, direction); // root has no parent

  this.branches.push(root);

  var current = root;
  var found = false;
  while (!found) {
    for (var i = 0; i < this.leaves.length; i++) {
      var distance = p5.Vector.dist(current.position, this.leaves[i].position);
      if (distance < maximumDistance) {
        // If we have branch close enough to do algo
        found = true;
      }
    }
    if (!found) {
      var branch = current.next(); // Get next branch
      current = branch;
      this.branches.push(current);
    }
  }

  this.show = function () {
    for (var i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show();
    }

    for (var i = 0; i < this.branches.length; i++) {
      this.branches[i].show();
    }
  };
}
