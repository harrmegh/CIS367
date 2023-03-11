// A branch is a position that has a parent from which it springs
function Branch(parent, position, direction) {
  this.parent = parent;
  this.position = position;
  this.direction = direction;
  this.originalDirection = this.direction.copy();
  this.count = 0;
  this.length = 1;

  this.reset = function () {
    this.direction = this.originalDirection.copy();
    this.count = 0;
  };

  this.next = function () {
    var nextDirection = p5.Vector.mult(this.direction, this.length);
    var nextPosition = p5.Vector.add(this.position, nextDirection);
    var nextBranch = new Branch(this, nextPosition, this.direction.copy()); // Copy to copy vector when branches change direction
    return nextBranch;
  };

  this.show = function () {
    if (parent != null) {
      stroke(255);
      line(this.parent.x, this.parent.y, this.position.x, this.position.y);
    }
  };
}
