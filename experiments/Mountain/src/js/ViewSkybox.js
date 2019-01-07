// ViewSkybox.js

import alfrid from 'alfrid';
let GL = alfrid.GL;
var glslify = require("glslify");

// function parse(url) {
//   return glslify(url, {
//     transform: [
//       ["glslify-hex", {
//         "option-1": true,
//         "option-2": 42
//       }],
//       ["global-transform", { global: true }],
//       ["post-transform", { post: true }]
//     ]
//   })
//
// }
// console.log(glslify)
// console.log(glslify('../shaders/skybox.vert'))
import skyboxVert from '../shaders/skybox.vert'
import skyboxfrag from '../shaders/skybox.frag'

class ViewSkybox extends alfrid.View {
	
	constructor() {
		// super(glslify( '../shaders/skybox.vert'), glslify('../shaders/skybox.frag'));
		super(skyboxVert, skyboxfrag);
	}


	_init() {
		this.mesh             = alfrid.Geom.skybox(15);
		this.meshWire		  = alfrid.Geom.skybox(15, false, GL.LINES);
	}


	render(textureRad) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("uExposure", "uniform1f", params.exposure);
		this.shader.uniform("uGamma", "uniform1f", params.gamma);
		textureRad.bind(0);
		GL.draw(params.showWires ? this.meshWire : this.mesh);
	}


}

export default ViewSkybox;
