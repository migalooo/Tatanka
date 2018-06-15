precision mediump float;

varying      vec4 v_position;
varying      vec2 v_texCoord;
varying      vec3 v_normal;
varying      vec3 v_surfaceToLight;
varying      vec3 v_surfaceToView;

uniform      vec4 u_lightColor;
uniform      vec4 u_ambient;
uniform      vec4 u_specular;
uniform     float u_shininess;
uniform     float u_specularFactor;
uniform sampler2D u_diffuse;

#pragma loader: import lit from './shaders/lit.vert';

void main() {
  vec3 a_normal       = normalize(v_normal);
  vec4 u_diffuseColor = texture2D(u_diffuse, v_texCoord);
  vec3 surfaceToLight = normalize(v_surfaceToLight);
  vec3 surfaceToView  = normalize(v_surfaceToView);
  vec3 halfVector     = normalize(surfaceToLight + surfaceToView);

  vec4 litR = lit(
        dot(a_normal, surfaceToLight),
        dot(a_normal, halfVector),
        u_shininess
      );

  vec4 outColor = vec4(
        (u_lightColor * (u_diffuseColor * litR.y + u_diffuseColor * u_ambient + u_specular * litR.z * u_specularFactor)).rgb,
        u_diffuseColor.a
      );

  gl_FragColor = outColor;
}
