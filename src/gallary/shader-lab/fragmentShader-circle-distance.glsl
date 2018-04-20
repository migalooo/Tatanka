#ifdef GL_ES
precision mediump float;
#endif
precision mediump float;
uniform vec2 u_side;
uniform float u_time;

void main(){
  vec2 st = gl_FragCoord.xy/u_side.xy;
  st.x *= u_side.x/u_side.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  st = st *2.-1.;
  float xxx =  cos(u_time);
  d = length( abs(st*xxx)-.3 );
  float ca;
  ca= fract(d*10.0);
	float pct;
  pct=smoothstep(0.9,1.0,ca);
  color = (1.0-pct)*ca+pct*color;
  gl_FragColor = vec4(color,1.0);
}
