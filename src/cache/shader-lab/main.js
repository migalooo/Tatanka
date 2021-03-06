import '>/assets/reset.css'
import '>/assets/app.css'
import {addProgram} from '>/utils/addProgram'

import vertexShaderSource from './vertexShader.glsl'
import fragmentShaderSource from './fragmentShader-cricle.glsl'
const {gl, program} = addProgram('#board', vertexShaderSource, fragmentShaderSource, true)

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.clearColor(255, 0, 0, 0)

// buffer
const offset = 0, side = 400
const positions = [
  offset, offset,
  side,   offset,
  offset, side,
  offset, side,
  side,   side,
  side,   offset
]
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
 
// glsl position
const a_position = gl.getAttribLocation(program, 'a_position')
const u_resolution = gl.getUniformLocation(program, 'u_resolution')
const u_side = gl.getUniformLocation(program, 'u_side')
const u_time = gl.getUniformLocation(program, 'u_time')

// set uniform 
gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height)
gl.uniform2f(u_side, side, side)

// set attribute
gl.enableVertexAttribArray(a_position)
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0)

let time = 0
function render() {
  gl.uniform1f(u_time, time += 0.05)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  requestAnimationFrame( render )
}

render()
