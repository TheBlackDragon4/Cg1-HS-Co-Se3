function ClearScreen() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");

  async function setup() {
    requestAnimationFrame(draw);
  }

  function draw() {
    // Draw the frame
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);  
    
    // draw next
    requestAnimationFrame(draw);
  }
  setup();
}


let t = new ClearScreen();



