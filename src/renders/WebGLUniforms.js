import {SingleUniform, ArrayUniform} from './WebGLUniforms.creater.js'
/**
 * Constructor Function for shader program uniform bind
 */
class WebGLUniforms {
  constructor(gl, program) {
    // cache of uniform setters
    this.map = []
    this.seq = []

    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)

    for (var i=0; i<count; i++) {
      const activeInfo = gl.getActiveUniform(program, i)
      const addr = gl.getUniformLocation(program, activeInfo.name)

      parseUniform(activeInfo, addr, this)
    }
  }

  setValue(gl, nameId, value) {
    const u = this.map[nameId]
    if ( u !== undefined ) u.setValue(gl, value)
  }

  // set object attribute value
  setOptional(gl, object, name) {
    const v = object[name]
    if (v !== undefined) this.setValue(gl, name, v)
  }
}

function parseUniform(activeInfo, addr, container) {
	let activeName = activeInfo.name
  let isArray = false

  if (activeName.substr(-3) === "[0]") {
    if (uniformInfo.size > 1) isArray = true
    activeName = activeName.substr(0, name.length - 3)
  }

  const uniformSetter = isArray ? new SingleUniform(nameId, activeInfo, addr) : new ArrayUniform(nameId, activeInfo, addr)

	container.seq.push(uniformSetter)
	container.map[uniformSetter.id] = uniformSetter
}

export default WebGLUniforms
