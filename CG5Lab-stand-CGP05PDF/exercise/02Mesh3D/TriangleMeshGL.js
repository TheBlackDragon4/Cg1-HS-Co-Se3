// @ts-check
import {
    SimpleMeshModelIO
} from "../../lib/helper/simple-mesh-model-io.js"

export class TriangleMeshGL {

    /**
     * Creat a triangle mesh color and positions 
     * 
     * @param {WebGL2RenderingContext} gl  WebGL Rendering Context
     * @param {*} simpleMeshIO Simple Mesh IO
     */
    constructor(gl, simpleMeshIO) {
        // nTriangleIndices = Gesamtanzahl der Indices
        this.nTriangleIndices = simpleMeshIO.indices.length;
        this.vao = null; // this .* muss in Java Script angegeben werden

        const triangles = simpleMeshIO.indices;
        const positions = simpleMeshIO.positions;
        const colors = simpleMeshIO.colors;
        const normals = simpleMeshIO.normals;

        const positionAttributeLocation = 0;
        const colorAttributeLocation = 1;
        const normalAttributeLocation = 2;

        // Create Vertex Array auf der Grafikkarte
        this.voa = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        // Erstellen des Vertex Buffer 
        const pb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        // Verwendung des PostitionAttributeLocation 
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation);

        // Verwendung der Postionen und Upload zur CPU (indices)
        const ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(triangles), gl.STATIC_DRAW);

        // Upload der Positionen im Vertex zur CPU (color)
        // Color Buffer Vertex zur CPU
        const cb = gl.createBuffer(); // wird für WireFrame verwendet
        if(colors != null){
            gl.bindBuffer(gl.ARRAY_BUFFER, cb);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            // Verwendung des PostitionAttributeLocation 
            gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(colorAttributeLocation);
        }

        // ///////////////////////////////////////////////////////////////////////////////////////////
        // Normalen weiterleiten - erstellen -> LAB4 Aufgabe 1
        // Erstellen eines neuen Normalen Array Objekt
        const nb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, nb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        // Verwendung von normalAttributeLocation
        // 3 benötigen wir, um zu vermitteln, das 3 Werte immer zusammengehören
        gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(normalAttributeLocation);

        // ///////////////////////////////////////////////////////////////////////////////////////////
        // Erzeugung des WireFrame
        // Erstellung eines neuen WireFrame Vertex Array Objekt
        this.vaoWireFrame = gl.createVertexArray();
        gl.bindVertexArray(this.vaoWireFrame);

        // Erneute Verwendung von Vertex BufferData -> Position Buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, pb); // Neues Vertex Array
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        // Verwendung des PostitionAttributeLocation  
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation);

        // Erstellung eines Arrays aus Dreiecken um Linien zu erhalten
        let wireFrame = []; // -> let wireFrame = [...];
        for (let i = 0; i < this.nTriangleIndices / 3; i++) {

            // triangles Array mit allen Indizes
            let i0 = triangles[i * 3 + 0]; // zweiter & dritter index wird übersprungen -> Relevant = Index 1
            let i1 = triangles[i * 3 + 1]; // erster & dritter index wird übersprungen -> Relevant = Index 2
            let i2 = triangles[i * 3 + 2]; // erster & zweiter index wird übersprungen -> Relevant = Index 3

            wireFrame.push(i0, i1); // erste Linie
            wireFrame.push(i1, i2); // zweite Linie
            wireFrame.push(i2, i0); // dritte Linie

        }
        this.nWireFrame = wireFrame.length;

        const ibwireframe = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibwireframe); // Bei Indices -> Element Array Buffer verwenden
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(wireFrame), gl.STATIC_DRAW);

        // Sorgt für die Linienabbildung in den Entsprechenden Farben für das Wireframe
        // Wenn ich den Colorrbuffer binde, kommt hier die Standardfarbe im Vertex-Schader an
        // Linien bei Babylöwe sind somit in Standardfarben und nicht mehr in Schwarz dargestellt
        gl.bindBuffer(gl.ARRAY_BUFFER, cb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        // Verwendung des PostitionAttributeLocation 
        gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.disableVertexAttribArray(colorAttributeLocation); // Wenn wir hier disable nutzen, dann bekommen wir die Default Farbe -> Schwarz heraus
        // gl.enableVertexAttribArray(colorAttributeLocation); // Wenn wir hier disable nutzen, dann bekommen wir die Default Farbe -> Schwarz heraus
    }

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     */
    draw(gl) {
        gl.bindVertexArray(this.vao);
        // gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_INT, 0);
        gl.drawElements(gl.TRIANGLES, this.nTriangleIndices, gl.UNSIGNED_INT, 0);
    }

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     */
    drawWireFrame(gl) {
        gl.bindVertexArray(this.vaoWireFrame);
        gl.drawElements(gl.LINES, this.nWireFrame, gl.UNSIGNED_INT, 0);
    }

}