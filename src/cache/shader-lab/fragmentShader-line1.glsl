precision mediump float;

uniform vec2 u_side;
uniform float u_time;

float plot(vec2 st, float channle) {
  return smoothstep(channle-0.01, channle, st.y) - smoothstep(channle, channle+0.01, st.y);
  // return smoothstep(channle-0.02, channle-0.019, st.y);
}
void main() {
  vec2 st = gl_FragCoord.xy/u_side;
  float channle = st.x;
  vec3 color = vec3(channle);

  float pct = plot(st, channle);
  color = (1.0-pct)*color+pct*vec3(0.0, 0.5, 0.5);
  gl_FragColor = vec4(color, 1.0);
}
