precision mediump float;

uniform vec2 u_side;
uniform float u_time;

vec3 colorA = vec3(0.1, 0.1, 0.9);
vec3 colorB = vec3(1.0, 0.8, 0.2);

float plot (vec2 st, float pct) {
  return smoothstep(pct-0.01, pct, st.y) - smoothstep(pct, pct+0.01, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_side.xy;
  vec3 color = vec3(0.0);
  vec3 pct = vec3(st.x);
  // float pct = abs(sin(u_time));

  // color = mix(colorA, colorB, pct);
  color = mix(colorA, colorB, st.y);

  gl_FragColor = vec4(color, 1.0);
}
