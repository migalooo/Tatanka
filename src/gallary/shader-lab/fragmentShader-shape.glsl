precision mediump float;

uniform vec2 u_side;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy/u_side;
  vec3 color = vec3(0.0);

  vec2 bl = step(vec2(0.1),st);
  float pct = bl.x * bl.y;

  color =  vec3(pct);

  gl_FragColor = vec4(color, 1.0);
}
