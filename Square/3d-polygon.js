// polygon.js
// Erik Fredericks with a few notations by Meghan Harris
// Graphics object
var gl, canvas;

var numVertices = 36;
var points = [];
var colors = [];

var vertices = [
  vec3(-0.5, -0.5, 0.5),
  vec3(-0.5, 0.5, 0.5),
  vec3(0.5, 0.5, 0.5),
  vec3(0.5, -0.5, 0.5),
  vec3(-0.5, -0.5, -0.5),
  vec3(-0.5, 0.5, -0.5),
  vec3(0.5, 0.5, -0.5),
  vec3(0.5, -0.5, -0.5),
];

var vertexColors = [
  [0.0, 0.0, 0.0, 1.0], // black
  [1.0, 0.0, 0.0, 1.0], // red
  [1.0, 1.0, 0.0, 1.0], // yellow
  [0.0, 1.0, 0.0, 1.0], // green
  [0.0, 0.0, 1.0, 1.0], // blue
  [1.0, 0.0, 1.0, 1.0], // magenta
  [0.0, 1.0, 1.0, 1.0], // cyan
  [1.0, 1.0, 1.0, 1.0], // white
];

var indices = [
  1, 0, 3, 3, 2, 1, 2, 3, 7, 7, 6, 2, 3, 0, 4, 4, 7, 3, 6, 5, 1, 1, 2, 6, 4, 5,
  6, 6, 7, 4, 5, 4, 0, 0, 1, 5,
];
// Once browser loaded, run this js code, aka main()
// Purpose is to set up the WebGL context and start rendering content
// onload: where execution starts after all code is loaded into memory
// this is important because canvas object needs to be preloaded into
// memory.  Canvas element exists and we are sure of it.
window.onload = function init() {
  // canvas element receives WebGL context from HTML file
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  // When something goes wrong (i.e., old af browser)
  if (!gl) {
    alert("WebGL isn't available");
  }

  colorCube();
  // Four vertices -- using vec2 type from the MV.js library
  // JS array different from C/Java: object with methods and properties
  // Order of these matter

  // Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Load shaders and initialize attribute buffers
  // initShadersL: load/compile/link shaders to form a program object
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  // tel webGL to use the program defined above
  gl.useProgram(program);

  // Load the data into the GPU
  // Data loaded into GPU by creating vertex buffer object
  // flatten(): converts a JS array to array of float32
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  // STATIC_DRAW because we are not animating
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
  // var iBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  // gl.bufferData(
  //   gl.ELEMENT_ARRAY_BUFFER,
  //   new Uint8Array(indices),
  //   gl.STATIC_DRAW
  // );

  // Associate our shader variables with our data buffer
  // Connect program variable to shader variable
  // Requires name/type/location in buffer
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  // square.js finalized
  render();
};

// Function to deliver the goods
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // theta += 0.025;
  // gl.uniform1f(thetaLoc, theta);
  gl.drawArrays(gl.TRIANGLES, 0, numVertices);
  // gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);
  requestAnimFrame(render);
}

function colorCube() {
  quad(0, 3, 2, 1);
  quad(2, 3, 7, 6);
  quad(0, 4, 7, 3);
  quad(1, 2, 6, 5);
  quad(4, 5, 6, 7);
  quad(0, 1, 5, 4);
}

function quad(a, b, c, d) {
  var indices = [a, b, c, a, c, d];
  for (var i = 0; i < indices.length; ++i) {
    points.push(vertices[indices[i]]);
    colors.push(vertexColors[indices[i]]);

    // for solid colored faces use
    //colors.push(vertexColors[a]);
  }
}
