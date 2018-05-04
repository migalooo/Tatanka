function createContext(el) {
  const warp = document.querySelector(el)
  const canvas = document.createElement('canvas')
  canvas.width = warp.clientWidth
  canvas.height = warp.clientHeight

  const names = ['webgl', 'experimental-webgl']
  let gl = null, i = 0 
  while (i<2) {
    try {
      gl = canvas.getContext(names[i])
    } catch(e) {}
    if (gl) break 
    i++
  }
  if (gl) {
    // init webgl viewport
    gl.viewportWidth = canvas.width
    gl.viewportHeight = canvas.height
  } else {
    alert('Failed to create WebGL gl!')
  }

  warp.appendChild(canvas)
  return gl
}

function createShader(gl, type, sourceCode) {
  // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
  const shader = gl.createShader(type)
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog( shader )
    throw "Could not compile WebGL shader program. \n\n" + info
  }
  return shader
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
    var info = gl.getProgramInfoLog(program)
    throw 'Could not create WebGL program. \n\n' + info
  }
  return program
}

export {
  createShader,
  createContext,
  createProgram
}
