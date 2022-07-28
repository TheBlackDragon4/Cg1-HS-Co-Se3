// @ts-check
import {
    SimpleMeshModelIO
} from "./../../lib/helper/simple-mesh-model-io.js"

export class TriangleMeshGL {

    /**
     * Creat a triangle mesh color and positions 
     * 
     * @param {WebGL2RenderingContext} gl  WebGL Rendering Context
     * @param {*} simpleMeshIO Simple Mesh IO
     */
    constructor(gl, simpleMeshIO) {
        this.nTriangleIndices = simpleMeshIO.indices.length;
        this.vao = null; // this .* muss in Java Script angegeben werden

        const triangles = simpleMeshIO.indices;
        const positions = simpleMeshIO.positions;
        const colors = simpleMeshIO.colors;

        const positionAttributeLocation = 0;
        const colorAttributeLocation = 1;

        // Einfügen der einzelnen Buffer 
        // 2. Create Vertex Array on the GPU
        this.vao = gl.createVertexArray(); //Speichert das Array in Variable vao
        gl.bindVertexArray(this.vao); //Aktuell verwendete Objekt -> Modifikation des Objektes

        // Folgendes sind Eigenschaften -> Wo befinden sich die Elemente. Welche Elemente haben wir usw.
        // 2.1 Upload Vertrex Positions to CPU
        const pb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pb); 
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        // 2.2 Configure Vertex Position attribute
        // Hier muss positionAttributeLocation verwendet werden
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation);

        ///////////////////////////////////////////////////////////

        // 2.3 Upload Vertrex Positions to CPU
        const cb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        
        // Create a new element array buffer for wireframe
        let wireframeElementArrayBuffer = [];
        let nTriangles = this.nTriangleIndices / 32;
        for(let tidx = 0; tidx < nTriangles; tidx++) {
            let i0 = triangles[tidx * 3 + 0]; // Erster Index eines Dreiecks
            let i1 = triangles[tidx * 3 + 1]; // Zweiter Index
            let i2 = triangles[tidx * 3 + 2]; // Dritter Index

            // First triangel edge
            wireframeElementArrayBuffer.push(i0);
            wireframeElementArrayBuffer.push(i1);

             // Second triangel edge
            wireframeElementArrayBuffer.push(i1);
            wireframeElementArrayBuffer.push(i2);

            // Third triangel edge
            wireframeElementArrayBuffer.push(i2);
            wireframeElementArrayBuffer.push(i0);

        }
         



        // Folgendes sind Initialisierung der Informationen
        //3. Upload Index Buffer
        const ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(triangles), gl.STATIC_DRAW);

        this.nTriangleIndices = triangles.length;

    }

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     */
    draw(gl) {

        gl.bindVertexArray(this.vao);
        // gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_INT, 0);
        gl.drawElements(gl.TRIANGLES, this.nTriangleIndices, gl.UNSIGNED_INT, 0);
        // gl.drawElements(gl.LINES, this.nWireFrameIndices, gl.UNSIGNED_INT, 0);

    }

    drawWireframe(gl) {
        gl.bindVertexArray(this.vao);
        // gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_INT, 0);
        // gl.drawElements(gl.TRIANGLES, this.nTriangleIndices, gl.UNSIGNED_INT, 0);
        // gl.drawElements(gl.LINES, this.nWireFrameIndices, gl.UNSIGNED_INT, 0);
    }

}