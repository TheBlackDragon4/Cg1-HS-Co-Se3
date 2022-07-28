import GLSLProgram  from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL, loadBinaryDataStreamFromURL } from "./../../lib/helper/http.js";
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"
import { TriangleMeshGL } from "./TriangleMeshGL.js"
import { Matrix3 } from "./Matrix3.js"

function Mesh2DApp() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  
  let mGlslProgram = null;
  let triangleMeshGL = null;

  async function setup() {
    // load shader
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(mCanvas, await loadDataFromURL(vertexShaderUrl), await loadDataFromURL(fragmentShaderUrl));

    // Load file.
    const streamReader = await loadBinaryDataStreamFromURL("./data/triangluatedlion.smm")
    const mesh = await SimpleMeshModelIO.load(streamReader);    


    // Create TriangleMeshGL Object
    triangleMeshGL = new TriangleMeshGL(gl, mesh);

    // Tell browser to perform animation and request that the browser calls the 
    // draw function to update an animation before the next repaint.
    requestAnimationFrame(draw);
  }

  function draw() {
    resize();

    let backgroundColor = document.getElementById("backgroundColor").value;
    let translateX = document.getElementById("TranslateX").value;
    let translateY = document.getElementById("TranslateY").value;
    let scaleX = document.getElementById("ScaleX").value;
    let scaleY = document.getElementById("ScaleY").value;
    let rotation = document.getElementById("Rotation").value;

    // Werte sollten zwischen 0 und 256 liegen
    let rB = parseInt(backgroundColor.substr(1,2),16)/255.0;
    let gB = parseInt(backgroundColor.substr(3,2),16)/255.0;
    let bB = parseInt(backgroundColor.substr(5,2),16)/255.0;

    // Implement me (Assignment 1c)
    gl.clearColor(rB, gB, bB, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let t_mat = Matrix3.translation(translateX, translateY);
    let s_mat = Matrix3.scaling(scaleX, scaleY);
    let r_mat = Matrix3.rotation(rotation);
    let aspect_mat = Matrix3.aspect(mCanvas.clientWidth, mCanvas.clientHeight);
    let comb_mat = Matrix3.multiply(aspect_mat, Matrix3.multiply(t_mat, Matrix3.multiply(r_mat, s_mat)));

    // Implement me (Assignment 1b and 3)
    const transformLoc = mGlslProgram.getUniformLocation("transform");
    mGlslProgram.use(); 
    gl.uniformMatrix3fv(transformLoc, true, comb_mat);

    triangleMeshGL.draw(gl);
    requestAnimationFrame(draw);
  }

  function resize() {
    let w = mCanvas.clientWidth;
    let h = mCanvas.clientHeight;

    if (mCanvas.width != w || mCanvas.height != h) 
    {
      mCanvas.width = w;
      mCanvas.height = h;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }
  setup();
}

async function main() {
  let t = new Mesh2DApp();
}

main();
