// @ts-check
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"

export class TriangleMeshGL{
    /**
     * Creates a triangle mesh with positions, colors and texture coordinates.
     * 
     * @param {WebGL2RenderingContext} gl WebGL Rendering Context
     * @param {*} simpleMeshIO Simple Mesh IO
     */
    constructor(gl, simpleMeshIO) {
        this.nTriangleIndices = simpleMeshIO.indices.length;

        const triangles     = simpleMeshIO.indices;
        const positions     = simpleMeshIO.positions;
        const colors        = simpleMeshIO.colors;

        const positionAttributeLocation = 0;
        const colorAttributeLocation = 1;

        // 1. Create Vertex array object on the GPU
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        // 2. Upload Vertex Positions to GPU 
        const pb = gl.createBuffer(); // hole GPU Speicher für Positionen
        gl.bindBuffer(gl.ARRAY_BUFFER, pb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        // Configure Vertex position attribute
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation);

        // 3. Upload color buffer
        const cb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        // Configure color attribute
        gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colorAttributeLocation);

        // 4. Upload Index Buffer (Element Array Buffer)
        const tb = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tb);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(triangles), gl.STATIC_DRAW);
    }

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 */
    draw(gl)
    {
        // Binde VAO
        gl.bindVertexArray(this.vao);
        // Dreiecke zeichnen, Indices angeben, Typ der Indices
        gl.drawElements(gl.TRIANGLES, this.nTriangleIndices, gl.UNSIGNED_INT, 0);
    }
}
