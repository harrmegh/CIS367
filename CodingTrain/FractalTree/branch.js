function Branch(begin, end) {
  this.begin = begin;
  this.end = end;
  this.finished = false;

  this.show = function () {
    stroke(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  };

  this.jitter = function () {
    this.end.x += random(-1, 1);
    this.end.y += random(-1, 1);
  };

  this.branchA = function () {
    // Make a vector that is the direction of this branch
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 6);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);

    var right = new Branch(this.end, newEnd);
    return right;
  };
  this.branchB = function () {
    // Make a vector that is the direction of this branch
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 4);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);

    var left = new Branch(this.end, newEnd);
    return left;
  };
}
