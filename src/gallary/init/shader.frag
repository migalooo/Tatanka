precision mediump float;

// our texture
uniform sampler2D u_image;

#pragma loader: import {plot} from './shaders/plot.glsl';


float t = plot(t); 

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
 gl_FragColor = texture2D(u_image, v_texCoord).rgba;
}
