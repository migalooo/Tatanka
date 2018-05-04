import {vec2, mix, flatten} from './tools/MV.js'
import initShader from './initShader.js'
import vertexShaderSource from './vertexShader.glsl'
import fragmentShaderSource from './fragmentShader.glsl'

export default function init() {
  const canvas = document.createElement('canvas')
  canvas.width = document.body.offsetWidth
  canvas.height = document.body.offsetHeight
  const warp = document.querySelector('#board').appendChild(canvas)
  // const canvas = document.querySelector('#board')
  const gl = canvas.getContext('webgl')
  const W = Math.min(canvas.width, canvas.height) * .8
  const H = ~~Math.sqrt(Math.pow(W, 2)-Math.pow(W/2, 2)) 
  const x = (canvas.width-W)/2
  const y = (canvas.height-H)/2

  gl.viewport(x, y, W, H)
  gl.clearColor(1.0, 1.0, 1.0, 1.0)

  const program = initShader(gl, vertexShaderSource, fragmentShaderSource)
  gl.useProgram(program)

  // Set data to GPU
  const points = generatePoints(6)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW)
  const vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray(vPosition)
  
  render(gl, points.length)
}

function generatePoints(deep) {
  const points = []
  const seeds = [
    vec2(-1, -1),
    vec2( 0,  1),
    vec2( 1, -1)
  ]
  _divideSeeds(...seeds, deep) 

  function _divideSeeds(a, b, c, deep) {
    if (deep === 0) return points.push(a, b, c) 
    const ab = mix(a, b, .5)
    const ac = mix(a, c, .5)
    const bc = mix(b, c, .5)
    deep--
    _divideSeeds(a, ab, ac, deep)
    _divideSeeds(c, ac, bc, deep)
    _divideSeeds(b, bc, ab, deep)
  }
  return points
}

function render(gl, count) {
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, count)
}

