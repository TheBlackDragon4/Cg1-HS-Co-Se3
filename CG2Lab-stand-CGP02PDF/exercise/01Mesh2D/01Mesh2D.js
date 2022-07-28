import GLSLProgram from "./../../lib/helper/glsl-program.js";
import {
  loadDataFromURL,
  loadBinaryDataStreamFromURL
} from "./../../lib/helper/http.js";
import {
  SimpleMeshModelIO
} from "./../../lib/helper/simple-mesh-model-io.js";
import {
  TriangleMeshGL
} from "./TriangleMeshGL-.js";
import {
  Matrix3
} from "./Matrix3.js"

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
    const streamReader = await loadBinaryDataStreamFromURL("./data/triangluatedlion.smm");
    const mesh = await SimpleMeshModelIO.load(streamReader);

    triangleMeshGL = new TriangleMeshGL(gl, mesh);
    requestAnimationFrame(draw);
  }

  function draw() {
    resize();

    let backgroundColor = document.getElementById("backgroundColor").value;
    // Aufgabe e)
    let wireframeColor = document.getElementById("wireframeColor").value;
    // Checkbox
    let wireframeCheckbox = document.getElementById("wireframecheckbox").checked;
    
    // Translation
    let translateX = document.getElementById("TranslateX").value;
    let translateY = document.getElementById("TranslateY").value;
    // Scalling
    let scaleX = document.getElementById("ScaleX").value;
    let scaleY = document.getElementById("ScaleY").value;
    // Rotation
    let rotation = document.getElementById("Rotation").value;

    // Farbveränderung für Hintergrund der Webseite
    let rB = parseInt(backgroundColor.substr(1, 2), 16) / 256.0; // Roter Wert auf Webseite
    let gB = parseInt(backgroundColor.substr(3, 2), 16) / 256.0; // Grüner Wert auf Webseite
    let bB = parseInt(backgroundColor.substr(5, 2), 16) / 256.0; // Blauer Wert auf Webseite
    gl.clearColor(rB, gB, bB, 1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Aufgabe e)
    let rBwireframe = parseInt(wireframeColor.substr(1, 2), 16) / 256.0; // Roter Wert auf Webseite auf Wireframe Button
    let gBwireframe = parseInt(wireframeColor.substr(3, 2), 16) / 256.0; // Grüner Wert auf Webseite auf Wireframe Button
    let bBwireframe = parseInt(wireframeColor.substr(5, 2), 16) / 256.0; // Blauer Wert auf Webseite auf Wireframe Button
    // gl.clearColor(rBwireframe, gBwireframe, bBwireframe, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    const wireFrameColorShader = mGlslProgram.getUniformLocation("wf_color"); // Zeiger auf Uniform Variable im Shader
    
    // Gibt die Position von der Translationsverschiebung der variable die gegeben wurde
    const transformLocation = mGlslProgram.getUniformLocation("transform");
    let translateMatrix = Matrix3.translation(translateX, translateY); // Aufruf von Funktion translation in Matrix3
    let scaleMatrix = Matrix3.scaling(scaleX, scaleY); // Aufruf von Funktion scaling in Matrix3
    let rotateMatrix = Matrix3.rotation(rotation); // Aufruf von Funktion rotatation in Matrix3
    let apectMatrix = Matrix3.aspect(mCanvas.clientWidth, mCanvas.clientHeight); // Aufruf von Funktion aspect für Anpassung in Matrix3 in Abhängigkeit von Width & Hight
    // Kombinationsmatrix benötigt
    let cobinationMatrix = Matrix3.multiply(apectMatrix, Matrix3.multiply(translateMatrix, Matrix3.multiply(rotateMatrix, scaleMatrix)));
    
    mGlslProgram.use(); // Angabe, dass ich mGlslProgram auch wirklich verwenden möchte
    // gl.uniformMatrix3fv(transformLocation, true, translate);
    // gl.uniformMatrix3fv(transformLocation, false, rotate);
    // gl.uniformMatrix3fv(transformLocation, false, scale);
    // Aufruf der Kombinationsmatrix
    // true = Transponieren , false = Nicht Transformieren
    gl.uniformMatrix3fv(transformLocation, true, cobinationMatrix); // true beachten -> Wichtig sonst funktioniert Transformation nicht 
    gl.uniform3f(wireFrameColorShader, rBwireframe, gBwireframe, bBwireframe); // Verwendung & Übergabe der Wirframe Farben an Fragment Shader
    
    // Aufgabe e)
    // Farben setzen für Wireframe -> Müssen in Abhänigkeit vom gezeichneten Draw gesetzt werden
    const isWireframeColorLoc = mGlslProgram.getUniformLocation("isWireframeColor"); // Weiterverwendung der Uniform Variabel im Fragment Shader
    gl.uniform1i(isWireframeColorLoc, true); // Wir übergeben True False -> Somit Boolean somit nimmt der die Vertex Farbe her
    // Aufgabe b)
    triangleMeshGL.draw(gl); // Muss als erstes aufgerufen werden, sodass der farbige Löwe gezeichnet wird, sodass im zweiten Schritt die Linien darüber gezeichnet werden können 
    // Checkbox
    if (wireframeCheckbox){
      gl.uniform1i(isWireframeColorLoc, false); // Wir übergeben True False -> Somit Boolean und jetzt nimmt der die selbst gewählte Farbe aus Shader her
      triangleMeshGL.drawWireFrame(gl); // Als Zweites müssen die Linien mit WireFrame gezeichnet werden und liegen nun über dem original Löwen -> Somit beides sichtbar
    }
    
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
  let t = new Mesh2DApp();
}

main();