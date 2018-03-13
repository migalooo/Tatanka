float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - smoothstep( pct, pct+0.01, st.y);
}

float other (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - smoothstep( pct, pct+0.01, st.y);
}
