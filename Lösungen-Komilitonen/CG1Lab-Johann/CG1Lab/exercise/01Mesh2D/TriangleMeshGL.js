import { SimpleMeshModelIO } from './../../lib/helper/simple-mesh-model-io.js';

export class TriangleMeshGL {
	/**
	 * @param {WebGL2RenderingContext} gl
	 * @param {SimpleMeshModelIO} simpleMeshIO
	 */
	constructor(gl, simpleMeshIO) {
		this.nTriangleIndices = simpleMeshIO.indices.length;
		this.vao = gl.createVertexArray();
		gl.bindVertexArray(this.vao);

		const triangles = simpleMeshIO.indices;
		const positions = simpleMeshIO.positions;
		const colors = simpleMeshIO.colors;

		const positionAttributeLocation = 0;
		const pb = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, pb);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(positionAttributeLocation);

		const colorAttributeLocation = 1;
		const cb = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cb);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(colorAttributeLocation);

		const tb = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tb);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(triangles), gl.STATIC_DRAW);
	}

	/**
	 * @param {WebGL2RenderingContext} gl
	 */
	draw(gl) {
		gl.bindVertexArray(this.vao);
		gl.drawElements(gl.TRIANGLES, this.nTriangleIndices, gl.UNSIGNED_INT, 0);
	}
}
