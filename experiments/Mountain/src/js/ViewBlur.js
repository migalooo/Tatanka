// ViewBlur.js

import alfrid from 'alfrid';
let GL = alfrid.GL;
// var glslify = require("glslify");
import blurVert from '../shaders/blur.vert'
import blurFrag from '../shaders/blur.frag'

class ViewBlur extends alfrid.View {
	
	constructor() {
		// super(glslify('../shaders/blur.vert'), glslify('../shaders/blur.frag'));
		super(blurVert, blurFrag);
	}

	_init() {
		this.mesh = alfrid.Geom.bigTriangle();
	}


	render(texture, isVertical) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		this.shader.uniform("direction", "uniform2fv", isVertical ? [0, 1] : [1, 0]);
		this.shader.uniform("range", "uniform1f", params.blurRange);
		GL.draw(this.mesh);
	}


}

export default ViewBlur;
