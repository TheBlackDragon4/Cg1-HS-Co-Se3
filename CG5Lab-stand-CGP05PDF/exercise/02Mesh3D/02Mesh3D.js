import GLSLProgram from "./../../lib/helper/glsl-program.js";
import {
  loadDataFromURL,
  loadBinaryDataStreamFromURL
} from "./../../lib/helper/http.js";
import {
  SimpleMeshModelIO
} from "./../../lib/helper/simple-mesh-model-io.js"
import {
  Matrix4
} from "./Matrix4.js";
import {
  TriangleMeshGL
} from "./TriangleMeshGL.js"

function Mesh3DApp() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");

  let mGlslProgram = null;
  let triangleMeshGL = null;

  /***
   * Run once one startup.
   */
  async function setup() {
    // load shader
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(mCanvas, await loadDataFromURL(vertexShaderUrl), await loadDataFromURL(fragmentShaderUrl));
    gl.enable(gl.DEPTH_TEST);
    // Load file.
    const streamReader = await loadBinaryDataStreamFromURL("./data/bunny.smm")
    const mesh = await SimpleMeshModelIO.load(streamReader);

    triangleMeshGL = new TriangleMeshGL(gl, mesh);
    requestAnimationFrame(draw);
  }

  /**
   * This function is executed, whenever the browser decides to draw a new image. 
   */
  function draw() {
    resize();
    let translateX = parseFloat(document.getElementById("TranslateX").value);
    let translateY = parseFloat(document.getElementById("TranslateY").value);
    let translateZ = parseFloat(document.getElementById("TranslateZ").value);

    let rotationX = parseFloat(document.getElementById("RotationX").value);
    let rotationY = parseFloat(document.getElementById("RotationY").value);
    let rotationZ = parseFloat(document.getElementById("RotationZ").value);

    let nearPlaneDistance = parseFloat(document.getElementById("NearPlane").value);
    let farPlaneDistance = parseFloat(document.getElementById("FarPlane").value);
    let fieldOfViewRadians = parseFloat(document.getElementById("FieldOfView").value);

    let backgroundColor = document.getElementById("backgroundColor").value;
    let rB = parseInt(backgroundColor.substr(1, 2), 16) / 255.0;
    let gB = parseInt(backgroundColor.substr(3, 2), 16) / 255.0;
    let bB = parseInt(backgroundColor.substr(5, 2), 16) / 255.0;

    let overlayWireFrame = document.getElementById("useWireFrame").checked;
    let wireFrameColor = document.getElementById("WireFrameColor").value;
    let rW = parseInt(wireFrameColor.substr(1, 2), 16) / 255.0;
    let gW = parseInt(wireFrameColor.substr(3, 2), 16) / 255.0;
    let bW = parseInt(wireFrameColor.substr(5, 2), 16) / 255.0;

    let ambientColor = document.getElementById("AmbientColor").value;
    let ambientR = parseInt(ambientColor.substr(1, 2), 16) / 255.0;
    let ambientG = parseInt(ambientColor.substr(3, 2), 16) / 255.0;
    let ambientB = parseInt(ambientColor.substr(5, 2), 16) / 255.0;

    let diffuseColor = document.getElementById("DiffuseColor").value;
    let diffuseR = parseInt(diffuseColor.substr(1, 2), 16) / 255.0;
    let diffuseG = parseInt(diffuseColor.substr(3, 2), 16) / 255.0;
    let diffuseB = parseInt(diffuseColor.substr(5, 2), 16) / 255.0;

    let specularColor = document.getElementById("SpecularColor").value;
    let specularR = parseInt(specularColor.substr(1, 2), 16) / 255.0;
    let specularG = parseInt(specularColor.substr(3, 2), 16) / 255.0;
    let specularB = parseInt(specularColor.substr(5, 2), 16) / 255.0;

    let specularExponent = parseFloat(document.getElementById("SpecularExponent").value);
    gl.clearColor(rB, gB, bB, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    const useUniformColorLoc = mGlslProgram.getUniformLocation("u_useUniformColor");
    const uniformColorLoc = mGlslProgram.getUniformLocation("u_uniformColor");
    const transformLocation = mGlslProgram.getUniformLocation("u_mvp"); // gibt die Transformlocation an Vertex Shader weiter
    const mvMatrixLocation = mGlslProgram.getUniformLocation("u_mv"); // gibt TransformierteInverse Matrix an Vertex Shader
    const mvInvTLocation = mGlslProgram.getUniformLocation("u_mvInvT") // gibt TransformierteInverse Matrix an Vertex Shader
    const diffuseColorLoc = mGlslProgram.getUniformLocation("diffuse_color"); // gibt DeffuseColor an Fragment Shader weiter
    const specularColorLoc = mGlslProgram.getUniformLocation("specular_color"); // gibt die SpekularColor an Fragment Shader weiter
    const specularExponentLoc = mGlslProgram.getUniformLocation("specular_exponent"); // gibt den specularen Exponenten an Fragment Shader weiter
    const ambientColorLoc = mGlslProgram.getUniformLocation("ambient_color"); // gibt die AmbiantColor an Fragment Shader weiter

    // Zusammenbauen der Matrix 
    // LAB03 d)
    let w = mCanvas.clientWidth;
    let h = mCanvas.clientHeight;
    // let aspectRatio = w > h ? h / w : w / h; // Berechnung von Alpha
    let aspectRatio = w / h; // Berechnung von Alpha
    let translateMatrix = Matrix4.translation(translateX, translateY, translateZ); // Erzeugung eines TranslationsMatrix
    let perspectiveMatrix = Matrix4.perspective(fieldOfViewRadians, aspectRatio, nearPlaneDistance, farPlaneDistance); // Erzeugung einer PerspectiveMatrix
    let rotationMatrixX = Matrix4.rotationX(rotationX); // Erzeugung einer RotaionMatrixX
    let rotationMatrixY = Matrix4.rotationY(rotationY); // Erzeugung einer RotaionMatrixY
    let rotationMatrixZ = Matrix4.rotationZ(rotationZ); // Erzeugung einer RotaionMatrixZ
    let rotationMatrixXYZ = Matrix4.multiply(rotationMatrixX, Matrix4.multiply(rotationMatrixY, rotationMatrixZ)) // Erzeugung einer RotaionMatrixXYZ
    let modelViewMatrix = Matrix4.multiply(translateMatrix, rotationMatrixXYZ);
    let modelViewProtectionMatrix = Matrix4.multiply(perspectiveMatrix, modelViewMatrix); // Erzeugung einer CombinationMatrix
    
    // Inverse Transponierte Model View Matrix berechnen -> LAB04 Aufgabe 2e)
    let modelViewInverse = Matrix4.inverse4x4(modelViewMatrix); // inverse = Inverse Matrix
    let mvInvT = Matrix4.transpose(modelViewInverse); // transpose = Transponierte Matrix 
    
    mGlslProgram.use(); // Als erstes auswählen
    gl.uniformMatrix4fv(transformLocation, true, modelViewProtectionMatrix); // Kombinationsmatrix für zukünftige Berechnungen  
    gl.uniformMatrix4fv(mvMatrixLocation, true, modelViewMatrix); // LAB a) Übergabe der ModelViewMatrix  
    gl.uniformMatrix4fv(mvInvTLocation, true, mvInvT); // Kombinationsmatrix für zukünftige Berechnungen  
    gl.uniform1i(useUniformColorLoc, false);
    gl.uniform3f(diffuseColorLoc, diffuseR, diffuseG, diffuseB); // LAB5 e)
    gl.uniform3f(specularColorLoc, specularR, specularG, specularB); // LAB5 2 e)
    gl.uniform1f(specularExponentLoc, specularExponent); // LAB5 2 e)
    gl.uniform3f(ambientColorLoc, ambientR, ambientG, ambientB); // LAB5 2f)
    triangleMeshGL.draw(gl);

    if (overlayWireFrame) {
      gl.uniform1i(useUniformColorLoc, true);
      gl.uniform3f(uniformColorLoc, rW, gW, bW);
      triangleMeshGL.drawWireFrame(gl);
    }
    requestAnimationFrame(draw);
  }

  /**
   * This method is executed once the drawing window dimensions change.
   */
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
  let t = new Mesh3DApp();
}

main();