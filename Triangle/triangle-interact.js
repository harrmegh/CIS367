// Erik Fredericks with a few notations by Meghan Harris
// Graphics object
var gl;
var x = 0.0;
var y = 0.0;
var xLoc, yLoc;
var dirs = [null, null]; // horizontal, vertical

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

  // Link the globals to the shader program
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

  // Event Listener
  window.addEventListener(
    "keydown",
    function (e) {
      if (e.keyCode === 37) {
        dirs[0] = false;
      } else if (e.keyCode === 39) {
        dirs[0] = true;
      } else if (e.keyCode === 38) {
        dirs[1] = true;
      } else if (e.keyCode === 40) {
        dirs[1] = false;
      } else if (e.keyCode === 32) {
        dirs[0] = null;
        dirs[1] = null;
      }
      console.log("Keycode: " + e.keyCode);
    },
    false
  );

  render();
};

// Package it up and ship it off
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  // Update your x/y positions
  //   x += 0.1;
  //   y += 0.1;
  if (dirs[0] === true)
    // move right
    x += 0.01;
  else if (dirs[0] === false)
    // move left
    x -= 0.01;
  if (dirs[1] === true)
    // move up
    y += 0.01;
  else if (dirs[1] === false)
    // move down
    y -= 0.01;
  gl.uniform1f(xLoc, x);
  gl.uniform1f(yLoc, y);

  window.requestAnimationFrame(render);
}
