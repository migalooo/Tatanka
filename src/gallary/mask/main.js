import '../../assets/reset.css'
import '../../assets/app.css'
import {createGL, createShader, createProgram} from '../../tools/createGLCanvas.js'
import vertexShaderSource from './vertexShader.glsl'
import fragmentShaderSource from './fragmentShader.glsl'
import {loadImage} from './util.js'

function main() {
  // Get A WebGL context
  const gl = createGL('#board')
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  // setup GLSL program
  const program = createProgram(gl, vertexShader, fragmentShader)
  gl.useProgram(program)
  gl.program = program

  // 配置纹理
  const n = initVertexBuffers(gl)
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  initTextures(gl, n)
}

function initVertexBuffers(gl) {
  const  verticesTexCoords = new Float32Array([
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0
  ])
  const n = 4 //点的个数

  // 创建缓冲区对象
  const vertexTexCoordBuffer = gl.createBuffer()

  // 将顶点坐标和纹理坐标写入缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW)

  const FSIZE = verticesTexCoords.BYTES_PER_ELEMENT

  // 获取a_Position的存储位置,分配缓冲区并开启
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)

  // 连接a_Poisition变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)

  // 将纹理坐标分配给A_TexCoord并开启它

  const a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')

  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
  gl.enableVertexAttribArray(a_TexCoord)// 开启缓冲区分配

  return n
}

function  initTextures(gl, n) {

  // 获取u_Sampler的存储位置
  const src0 = './images/sky.jpg'
  const src1 = './images/circle.gif'
  Promise.all([loadImage(src0), loadImage(src1)])
    .then(function(images) {
      images.forEach((image, index) => {
        const texture = gl.createTexture() // 创建纹理对象
        const u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler'+index)
        loadTexture(gl, n, texture, u_Sampler, image, index)
        console.log(image)
      })
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n) //绘制矩形
    })
    .catch(function(err){
      throw err
    })

  return true
}

function loadTexture(gl, n , texture, u_Sampler, image, index) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1) //对纹理图像进行y轴反转

  //开启0号纹理单元
  gl.activeTexture(gl['TEXTURE'+index])

  // 向 target 绑定纹理对象
  gl.bindTexture(gl.TEXTURE_2D, texture)

  // 配置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)

  // 配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

  // 将纹理传递给着色器
  gl.uniform1i(u_Sampler, index)

  // gl.clear(gl.COLOR_BUFFER_BIT)

}

main()
