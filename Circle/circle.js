// Erik Fredericks with a few notations by Meghan Harris
// Graphics object
var gl;
var points;
var vertices;

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
  vertices = [vec2(0, 0)];

  let step = Math.PI / 256;

  for (let t = 0; t < Math.PI * 2.0 + step; t += step) {
    let x = 0.75 * Math.cos(t);
    let y = 0.75 * Math.sin(t);

    // something
    vertices.push(vec2(x, y));
  }

  // configure WebGL, canvas in middle (0, 0)
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // load and initialize shaders
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // set position and render
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  render();
};

// Package it up and ship it off
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  console.log("Vertices: ", vertices);
  gl.drawArrays(gl.TRIANGLES_FAN, 0, vertices.length);
}
