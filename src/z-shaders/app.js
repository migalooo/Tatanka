import '../assets/reset.css'
import '../assets/app.css'
import {createGL, createShader, createProgram} from '../tools/createGLCanvas.js'
import vertexShaderSource from './vertexShader.glsl'
import fragmentShaderSource from './fragmentShader.glsl'

const gl = createGL('#board')
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program = createProgram(gl, vertexShader, fragmentShader)
gl.useProgram(program)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)

// buffer
const positions = [
  10, 20,
  400, 20,
  10, 400,
  10, 400,
  400, 400,
  400, 20,
]
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
 
// glsl position
const a_position = gl.getAttribLocation(program, 'a_position')
const u_resolution = gl.getUniformLocation(program, 'u_resolution')
const u_res = gl.getUniformLocation(program, 'u_res')
const u_time = gl.getUniformLocation(program, 'u_time')

// set uniform 
gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height)
gl.uniform2f(u_res, 400, 400)

// set attribute
gl.enableVertexAttribArray(a_position)
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0)

function render() {
  const date = new Date()
  // gl.uniform1f(u_time, (date.getSeconds()-30)/60)
  gl.uniform1f(u_time, Math.random())
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}

render()
