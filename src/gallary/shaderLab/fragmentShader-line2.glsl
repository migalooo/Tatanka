precision mediump float;

uniform vec2 u_side;
uniform float u_time;

float plot(vec2 st, float channle) {
  return smoothstep(channle-0.02, channle, st.y) - smoothstep(channle, channle+0.02, st.y);
}

float bin (float x){
  float x2 = x*x;
  float x4 = x2*x2;
  float x6 = x4*x2;

  float fa = ( 4.0/9.0);
  float fb = (17.0/9.0);
  float fc = (22.0/9.0);

  float y = fa*x6 - fb*x4 + fc*x2;
  return y;
}
float quadraticBezier (float x, float a, float b){
  float epsilon = 0.00001;
  a = max(0.0, min(1.0, a));
  b = max(0.0, min(1.0, b));
  if (a == 0.5){
    a += epsilon;
  }
  // solve t from x (an inverse operation)
  float om2a = 1.0 - 2.0*a;
  float t = (sqrt(a*a + om2a*x) - a)/om2a;
  float y = (1.0-2.0*b)*(t*t) + (2.0*b)*t;
  return y;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_side;
  // float channle = pow(st.x, 5.0);
  // float channle = step(0.5,st.x);
  // float channle = smoothstep(0.1, 0.9,st.x);
  // float channle = bin(st.x);
  float channle = quadraticBezier(st.x, 0.2, 0.8);
  vec3 color = vec3(channle);

  float pct = plot(st, channle);
  color = (1.0-pct)*color+pct*vec3(0.0, 0.5, 0.5);
  gl_FragColor = vec4(color, 1.0);
}
