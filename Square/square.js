// square.js
// Erik Fredericks with a few notations by Meghan Harris
// Graphics object
var gl;
var points;

// Once browser loaded, run this js code, aka main()
// Purpose is to set up the WebGL context and start rendering content
// onload: where execution starts after all code is loaded into memory
window.onload = function init() {
  // canvas element receives WebGL context from HTML file
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  // Four vertices -- using vec2 type from the MV.js library
  // JS array different from C/Java: object with methods and properties
  var vertices = [
    vec2(-0.5, -0.5),
    vec2(-0.5, 0.5),
    vec2(0.5, 0.5),
    vec2(0.5, -0.5),
  ];

  // Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Load shaders and initialize attribute buffers
  // initShadersL: load/compile/link shaders to form a program object
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Load the data into the GPU
  // Data loaded into GPU by creating vertex buffer object
  // flatten(): converts a JS array to array of float32
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate our shader variables with our data buffer
  // Connect program variable to shader variable
  // Requires name/type/location in buffer
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // square.js finalized
  render();
};

// Function to deliver the goods
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  //   gl.drawArrays(gl.TRIANGLES, 0, 6);
  //   gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
