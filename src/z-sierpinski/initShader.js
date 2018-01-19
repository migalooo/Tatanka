module.exports = function initShaders(gl, vertexShaderSource, fragmentShaderSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentsShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentsShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const msg = `Shader program failed to link \n${gl.getProgramInfoLog(program)}`
    console.log(msg)
    return -1
  }
  return program
} 

function createShader(gl, shaderType, shaderSource) {
  const shader = gl.createShader(shaderType)
  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader) 
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const msg = `Shader failed to compile \n${gl.getShaderInfoLog(shader)}`
    console.log(msg)
    return -1
  }
  return shader
}
