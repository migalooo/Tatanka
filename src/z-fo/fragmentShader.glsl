precision mediump float;

varying vec3 v_normal;
// Passed in from the vertex shader.
uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;

void main() {
  vec3 normal = normalize(v_normal);
  float light = dot(normal, u_reverseLightDirection);
  gl_FragColor = u_color;
  gl_FragColor.rgb *= light;
}
