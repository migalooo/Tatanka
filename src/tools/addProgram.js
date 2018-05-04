import {createContext, createShader, createProgram} from './initShader.js'

function addProgram(el, vertexShaderSource, fragmentShaderSource, logSource = false) {
  if (logSource) {
    console.log('%c  Vertex Shader ▼  ','background:#f9f9f9;color:#20b1ec')
    console.log(vertexShaderSource)
    console.log('%c  Fragment Shader ▼  ','background:#f9f9f9;color:#20b1ec')
    console.log(fragmentShaderSource)
    console.log('%c  ▲  ','background:#f9f9f9;color:#20b1ec')
  }
  // Create WebGL context
  const gl = createContext(el)
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  // Setup GLSL program
  const program = createProgram(gl, vertexShader, fragmentShader)
  gl.useProgram(program)
  return {
    gl,
    program
  }
}

export {
  addProgram
}
