// variables: A B
// axiom: A
// rules: (A -> AB), (B -> A)

var PI = 3.14;
var angle;
var axiom = "F";
var rules = [];
var len = 100;

// - left + right F forward [ save state ] carry on
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]",
};

// rules[1] = {
//   a: "B",
//   b: "A",
// };

var sentence = axiom;

function generate() {
  len *= 0.5;
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current === rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, height); // bring back to 0, 0
  stroke(255, 100);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current === "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    } else if (current === "[") {
      push();
    } else if (current === "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(400, 400);
  angle = radians(25);
  background(51);
  // creat paragraph element in page
  createP(axiom);
  turtle();
  var button = createButton("generate");
  button.mousePressed(generate);
}
