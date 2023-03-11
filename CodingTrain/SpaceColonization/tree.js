// Constructor function for tree
function Tree() {
  this.leaves = [];
  this.branches = [];

  for (var i = 0; i < 500; i++) {
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

  this.grow = function () {
    for (var i = 0; i < this.leaves.length; i++) {
      var leaf = this.leaves[i];

      var closestBranch = null;
      var record = 100000;

      // For every leaf, what is its closest branch?
      for (var j = 0; j < this.branches.length; j++) {
        var branch = this.branches[j];
        var distance = p5.Vector.dist(leaf.position, branch.position);

        if (distance < minimumDistance) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if (distance > maximumDistance) {
          //   break;
        } else if (closestBranch == null || distance < record) {
          closestBranch = branch;
          record = distance;
        }
      }

      if (closestBranch != null) {
        var newDirection = p5.Vector.sub(leaf.position, closestBranch.position);
        newDirection.normalize(); // Can scale or play with this
        closestBranch.direction.add(newDirection);
        closestBranch.count++;
      }
    }

    // Delete leaves
    for (var i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1);
      }
    }

    // What branches were attracted to what leaves
    for (var i = this.branches.length - 1; i >= 0; i--) {
      var branch = this.branches[i];
      if (branch.count > 0) {
        branch.direction.div(branch.count + 1);
        this.branches.push(branch.next());
      }
      branch.reset();
    }
  };

  this.show = function () {
    for (var i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show();
    }

    for (var i = 0; i < this.branches.length; i++) {
      this.branches[i].show();
    }
  };
}
