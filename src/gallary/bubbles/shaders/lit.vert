vec4 lit(float l ,float h, float m) {
  return vec4(1.0,
      max(l, 0.0),
      (l > 0.0) ? pow(max(0.0, h), m) : 0.0,
      1.0);
}
