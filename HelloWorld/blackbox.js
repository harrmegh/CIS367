/* 
blackbox.js
Erik Fredericks, W2021
Basic WebGL clearing example.
*/
main();

function main() {
  const canvas = document.querySelector("#c");
  const gl = canvas.getContext("webgl");

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
