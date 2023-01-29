// gasket1.js
// Code written mostly by Erik Fredericks with some additions by Meghan Harris

var gl;
var points;
var NumPoints = 5000;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Main function to set up WebGL object and render the image
window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }
  // First, initialize the corners of our gasket with three points.
  var vertices = [vec2(-1, -1), vec2(0, 1), vec2(1, -1)]; // rightside up
  // var vertices = [vec2(-1, 1), vec2(0, -1), vec2(1, 1)]; // upside down
  // var vertices = [vec2(-1, 1), vec2(1, 0), vec2(-1, -1)]; // Sideways

  // Specify a starting point p for our iterations
  // p must lie inside any set of three vertices
  // Happening in the CPU
  var u = add(vertices[0], vertices[1]);
  var v = add(vertices[0], vertices[2]);
  // Scanle these vectors by 4
  var p = scale(0.25, add(u, v));

  // And, add our initial point into our array of points
  points = [p];

  // Compute new points
  // Each new point is located midway between
  // last point and a randomly chosen vertex
  // Happening in CPU
  for (var i = 0; points.length < NumPoints; ++i) {
    var j = Math.floor(Math.random() * 3);
    p = add(points[i], vertices[j]);
    // p = scale(getRandomArbitrary(0.1, 0.4), p); // Add randomness to scale
    p = scale(getRandomArbitrary(0.1, 0.2), p);
    // p = scale(0.5, p);
    points.push(p);
  }

  // Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Load the data into the GPU
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  // Flatten points instead of vertices
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, points.length);
}
