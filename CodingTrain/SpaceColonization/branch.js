// A branch is a position that has a parent from which it springs
function Branch(parent, position, direction) {
  this.parent = parent;
  this.position = position;
  this.direction = direction;

  this.next = function () {
    var nextPosition = p5.Vector.add(this.position, this.direction);
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
