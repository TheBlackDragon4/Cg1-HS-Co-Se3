import GLSLProgram from './../../lib/helper/glsl-program.js';
import { loadDataFromURL } from './../../lib/helper/http.js';

function SimpleTriangle() {
	const mCanvas = document.querySelector('#canvas');
	/** @type {WebGL2RenderingContext} */
	const gl = mCanvas.getContext('webgl2');
	/** @type {GLSLProgram} */
	let mGlslProgram = null;
	/** @type {WebGLVertexArrayObject} */
	let vao = null;

	async function setup() {
		const positions = [
			-1.0, -1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, -1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0,
		];
		const indices = [0, 1, 2, 1, 2, 3];
		const colors = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0];

		vao = gl.createVertexArray();
		gl.bindVertexArray(vao);

		const pb = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, pb);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

		const positionAttributeLocation = 0; //mGlslProgram.getAttributeLocation('inVertex');
		gl.vertexAttribPointer(positionAttributeLocation, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(positionAttributeLocation);

		const cb = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cb);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		const colorAttributeLocation = 1;
		gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(colorAttributeLocation);

		const ib = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);

		const vertexShaderUrl = document.querySelector('#vertexShader').src;
		const fragmentShaderUrl = document.querySelector('#fragmentShader').src;
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

		//const u_color = mGlslProgram.getUniformLocation('u_color');
		mGlslProgram.use();
		//gl.uniform3f(u_color, 1.0, 0.0, 1.0);
		gl.bindVertexArray(vao);
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGEND_INT, 0);
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
