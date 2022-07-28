// @ts-check
import GLSLProgram from './../../lib/helper/glsl-program.js';
import { loadDataFromURL, loadBinaryDataStreamFromURL } from './../../lib/helper/http.js';
import { SimpleMeshModelIO } from './../../lib/helper/simple-mesh-model-io.js';
import { TriangleMeshGL } from './TriangleMeshGL.js';
import { Matrix3 } from './Matrix3.js';

function Mesh2DApp() {
	/** @type {HTMLCanvasElement} */
	const mCanvas = document.querySelector('#canvas');

	/** @type {WebGL2RenderingContext} */
	const gl = mCanvas.getContext('webgl2');

	/** @type {GLSLProgram} */
	let mGlslProgram = null;
	let triangleMeshGL = null;

	async function setup() {
		// load shader
		const vertexShaderUrl = document.querySelector('#vertexShader').src;
		const fragmentShaderUrl = document.querySelector('#fragmentShader').src;
		mGlslProgram = new GLSLProgram(
			mCanvas,
			await loadDataFromURL(vertexShaderUrl),
			await loadDataFromURL(fragmentShaderUrl)
		);

		// Load file.
		const streamReader = await loadBinaryDataStreamFromURL('./data/triangluatedlion.smm');
		const mesh = await SimpleMeshModelIO.load(streamReader);

		triangleMeshGL = new TriangleMeshGL(gl, mesh);
		requestAnimationFrame(draw);
	}

	function draw() {
		resize();

		let backgroundColor = document.getElementById('backgroundColor').value;

		let translateX = document.getElementById('TranslateX').value;
		let translateY = document.getElementById('TranslateY').value;
		let scaleX = document.getElementById('ScaleX').value;
		let scaleY = document.getElementById('ScaleY').value;
		let rotation = document.getElementById('Rotation').value;

		let rB = parseInt(backgroundColor.substr(1, 2), 16) / 256.0;
		let gB = parseInt(backgroundColor.substr(3, 2), 16) / 256.0;
		let bB = parseInt(backgroundColor.substr(5, 2), 16) / 256.0;

		const translation = Matrix3.translation(parseFloat(translateX), parseFloat(translateY));
		const scale = Matrix3.scaling(scaleX, scaleY);
		const rotate = Matrix3.rotation(parseFloat(rotation));
		const aspect = Matrix3.aspect(mCanvas.width, mCanvas.height);

		const transform = Matrix3.multiply(
			aspect,
			Matrix3.multiply(translation, Matrix3.multiply(rotate, scale))
		);

		const mat3_transform = mGlslProgram.getUniformLocation('mat3_transform');

		// Implement me (Assignment 3)

		// Implement me (Assignment 1c)
		gl.clearColor(rB, gB, bB, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		mGlslProgram.use();
		gl.uniformMatrix3fv(mat3_transform, true, transform);

		triangleMeshGL.draw(gl);

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
