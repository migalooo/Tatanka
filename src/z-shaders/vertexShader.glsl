attribute vec2 a_position;
uniform vec2 u_resolution;

void main() {
  vec2 normal = (a_position/u_resolution) * 2.0 - 1.0;
  // gl_Position = vec4(normal * vec2(1, -1), 0, 1);
  gl_Position = vec4(normal , 0, 1);
}
