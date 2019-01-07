// ViewTreshold.js


import alfrid from 'alfrid';
let GL = alfrid.GL;
// var glslify = require("glslify");
import threshold from '../shaders/threshold.frag'

class ViewTreshold extends alfrid.View {
	
	constructor() {
		super(alfrid.ShaderLibs.bigTriangleVert, threshold);
	}


	_init() {
		this.mesh = alfrid.Geom.bigTriangle();
	}


	render(texture) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		this.shader.uniform("threshold", "uniform1f", params.threshold);
		GL.draw(this.mesh);
	}


}

export default ViewTreshold;
