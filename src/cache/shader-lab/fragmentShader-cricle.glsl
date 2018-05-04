import { plot, other } from './file.glsl';

precision mediump float;
uniform vec2 u_side;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy/u_side;
  float pct = 0.0;

  plot(st,pct);
  vec2 coord = st-0.5;
  float radius = 0.5;
  // float dist = distance(st, vec2(0.5));
  float dist = dot(coord, coord)*2.0;
  float mask = 	1.0-smoothstep(radius-(radius*0.02), radius+(radius*0.02), dist);
  vec4 color =  vec4(dist);
  color.a = mask;

  gl_FragColor = vec4(color);
}
