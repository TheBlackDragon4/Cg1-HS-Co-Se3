function ClearScreen() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");

  // setup läd die Ressourcen und startet die jeweilige Animation
  async function setup() {
    requestAnimationFrame(draw);
  }

  // Aufruf der Funktion in entsprechenden Abständen
  function draw() {
    // Draw the frame
    //             R , G  , B  , ALPHA
    gl.clearColor(0.0, 1.0, 0.0, 1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT);  //Erlaubt das Befüllen der Fabe im Screen
    
    // draw next
    requestAnimationFrame(draw); // Erlaubt die Ausführung von einer Animation
  }
  setup(); //Ähnlich wie bei Proccessing
}


let t = new ClearScreen(); //Generation einer neuen Klasse vom Typ ClearScreen



