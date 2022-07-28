import GLSLProgram from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL } from "./../../lib/helper/http.js";

function SimpleTriangle() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  let mGlslProgram = null;
  let vao = null;

  async function setup() {
    // 1. Create Mesh on the CPU
    const positions = [
      // x,  y  ,  z ,  w = 1.0 Aktuell
      -1.0, -1.0, 0.0, 1.0, // Position 0
       0.0, 1.0, 0.0, 1.0, // Position 1
       1.0, -1.0, 0.0, 1.0, // Position 2
       1.0, 1.0, 0.0, 1.0 // Postition 3
      // x,y,z,w 
    ];

    const colors = [
      1.0, 0.0, 0.0, // red
      0.0, 1.0, 0.0, // green
      0.0, 0.0, 1.0, // blue
      1.0, 1,0, 0.0  // yellow 

    ];

    const indices = [0, 1, 2, // Gibt die Sortierreihenfolge an
                     1, 2, 3
    ];

    // 2. Create Vertex Array on the GPU
    vao = gl.createVertexArray(); //Speichert das Array in Variable vao
    gl.bindVertexArray(vao); //Aktuell verwendete Objekt -> Modifikation des Objektes
    
    // 2.1 Upload Vertrex Positions to CPU
    const pb = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // 2.2 Configure Vertex Position attribute
    const positionAttributeLocation = 0;
    gl.vertexAttribPointer(positionAttributeLocation, 4, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    ///////////////////////////////////////////////////////////

    // 2.3 Upload Vertrex Positions to CPU
    const cb = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // 2.4 Configure Vertex Position attribute
    const colorAttribteLocation = 1;
    gl.vertexAttribPointer(colorAttribteLocation, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(colorAttribteLocation);

    //////////////////////////////////////////////////////////

    //3. Upload Index Buffer
    const ib = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices),gl.STATIC_DRAW);

    // 4. Create a Shader
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(
      mCanvas,
      await loadDataFromURL(vertexShaderUrl),
      await loadDataFromURL(fragmentShaderUrl)
    );
    
    requestAnimationFrame(draw);
  }

  function draw() {
    resize();
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    mGlslProgram.use();
    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);// gl.TRIANGLES sagt, dass ich ein Dreieck nutze, 0 = Starte bei Index 0, 3 = Fortesetzung bei 3
    requestAnimationFrame(draw);
  }

  function resize() {
    let w = mCanvas.clientWidth;
    let h = mCanvas.clientHeight;

    if (mCanvas.width != w || mCanvas.height != h) {
      mCanvas.width = w;
      mCanvas.height = h;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }

  setup();
}

async function main() {
  let t = new SimpleTriangle();
}

main();


