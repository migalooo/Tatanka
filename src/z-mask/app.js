import '../assets/reset.css'
import '../assets/app.css'
import {createGL, createShader, createProgram} from '../tools/createGLCanvas.js'
import vertexShaderSource from './vertexShader.glsl'
import fragmentShaderSource from './fragmentShader.glsl'
import {loadImage} from './util.js'

function render(image) {
  // Get A WebGL context
  const gl = createGL('#board')
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  // setup GLSL program
  const program = createProgram(gl, vertexShader, fragmentShader)
}

function initVertexBuffers(gl) {
  const verticesTexCoords = new Float32Array([
    -.5, -.5, 0, 1,
    -.5, -.5, 0, 0,
     .5, -.5, 1, 1,
     .5, -.5, 1, 1,
  ])
  const n =4

  const vertexTexCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)
  gl.bufferData(gl.array_buffer, verticesTexCoords, gl.STATIC_DRAW)

  const fsize = verticesTexCoords.BYTES_PER_ELEMENT
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, fsize*4, 0)
  gl.enableVertexAttribArray(a_Position)

  const a_TexCoord = gl.getAttribLocation(gl.program, 'g_TexCoord')
  gl.vertexAttribPosinter(a_TexCoord, 2, gl.FLOAT, false, fsize*4, fsize*2)
  gl.enableVertexAttribArray(a_TexCoord)

  return n 
}

function initTextures(gl, n) {
  const texture0 = gl.createTexture()
  const texture1 = gl.createTexture()
}

loadImage('./images/image.jpg')
  .then(function(image){
    render(image)
  })
  .catch(function(err){
    throw err
  })
