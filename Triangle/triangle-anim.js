// Erik Fredericks with a few notations by Meghan Harris
// Graphics object
var gl;
var x = 0.0;
var y = 0.0;
var xLoc, yLoc;
var xDir = 1.0;
var yDir = 1.0;
var colors = [vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.5), vec3(0.0, 0.0, 0.5)];

// Once browser loaded, run this js code, aka main()
// Purpose is to set up the WebGL context and start rendering content
window.onload = function init() {
  // Setup our canvas and WebGL
  // Acts as our reference to canvas
  var canvas = document.getElementById("gl-canvas");

  // Get a context for the canvas
  // If not null, gl is our reference to the context
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL unavailable");
  }
  // Triangle vertices
  var vertices = [vec2(-0.25, -0.25), vec2(0, 0.25), vec2(0.25, -0.25)];

  // configure WebGL, canvas in middle (0, 0)
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // load and initialize shaders
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // .Link up the shader to our application
  xLoc = gl.getUniformLocation(program, "x");
  yLoc = gl.getUniformLocation(program, "y");

  // load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // set position and render
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  render();
};

// Package it up and ship it off
function render() {
  x += 0.05 * xDir;
  y += 0.1 * yDir;

  // Bounded Movement
  if (y > 0.9) {
    // top hit -- reverse y but keep x
    y = 0.9;
    yDir *= -1.0;
  }
  if (x > 0.9) {
    // right hit -- reverse x but keep y
    x = 0.9;
    xDir *= -1.0;
  }
  if (y < -0.9) {
    // bottom hit -- reverse y but keep x
    y = -0.9;
    yDir *= -1.0;
  }
  if (x < -0.9) {
    // left hit -- reverse x but keep y
    x = -0.9;
    xDir *= -1.0;
  }

  gl.uniform1f(xLoc, x);
  gl.uniform1f(yLoc, y);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  window.requestAnimationFrame(render);
}
