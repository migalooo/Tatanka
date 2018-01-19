import '../assets/reset.css'
import '../assets/app.css'
import {createGL, createShader, createProgram} from '../tools/createGLCanvas.js'
import vertexShaderSource from './vertexShader.glsl'
import fragmentShaderSource from './fragmentShader.glsl'

const gl = createGL('#board')
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program = createProgram(gl, vertexShader, fragmentShader)

// 初始化完成时候找到glsl属性值位置
const a_position = gl.getAttribLocation(program, 'a_position')
const u_resolution = gl.getUniformLocation(program, 'u_resolution')

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

const positions = [
  10, 20,
  80, 20,
  10, 30,
  10, 30,
  80, 20,
  80, 30,
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

// 渲染
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.useProgram(program)
gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height)

gl.enableVertexAttribArray(a_position)

const size = 2,
      type = gl.FLOAT,
      normalize = false,
      stride = 0,
      offset = 0
gl.vertexAttribPointer(a_position, size, type, normalize, stride, offset)

const primitiveType = gl.TRIANGLES
const count = 6
gl.drawArrays(primitiveType, offset, count)
