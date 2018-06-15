/**
 * Creates setter for all uniforms of shaders from a given program
 */
function uniformSetters(gl, program) {
  const setters = {}
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  const textureUnit = 0

  for (let i = 0; i < numUniforms; ++i) {
    const uniformInfo = gl.getActiveUniform(program, i)
    if (!uniformInfo) break

    let name = uniformInfo.name
    // If this uniform is an array
    let isArray = false
    // remove the array suffix.
    if (name.substr(-3) === "[0]") {
      if (uniformInfo.size > 1) isArray = true
      name = name.substr(0, name.length - 3)
    } 

    const setter = createUniformSetter(program, uniformInfo, isArray, textureUnit)
    setters[name] = setter
  }
  return setters
}


function createUniformSetter(program, uniformInfo, isArray) {
  const location = gl.getUniformLocation(program, uniformInfo.name)

  switch (uniformInfo.type) {
    case gl.FLOAT:
      return isArray
        ? uniformSetter('uniform1fv')
        : uniformSetter('uniform1f')

    case gl.FLOAT_VEC2:
      return uniformSetter('uniform2fv')

    case gl.FLOAT_VEC3:
      return uniformSetter('uniform3fv')

    case gl.FLOAT_VEC4:
      return uniformSetter('uniform4fv')

    case gl.INT:
      return isArray
        ? uniformSetter('uniform1iv')
        : uniformSetter('uniform1i')

    case gl.INT_VEC2:
      return uniformSetter('uniform2iv')

    case gl.INT_VEC3:
      return uniformSetter('uniform3iv')

    case gl.INT_VEC4:
      return uniformSetter('uniform4iv')

    case gl.BOOL:
      return uniformSetter('uniform1iv')

    case gl.BOOL_VEC2:
      return uniformSetter('uniform2iv')

    case gl.BOOL_VEC3:
      return uniformSetter('uniform3iv')

    case gl.BOOL_VEC4:
      return uniformSetter('uniform4iv')

    case gl.FLOAT_MAT2:
      return uniformMatrixSetter('uniformMatrix2fv')

    case gl.FLOAT_MAT3:
      return uniformMatrixSetter('uniformMatrix3fv')

    case gl.FLOAT_MAT4:
      return uniformMatrixSetter('uniformMatrix4fv')

    case gl.SAMPLER_2D:
      return isArray
        ? uniformTexturesSetter(gl.TEXTURE_2D, uniformInfo.size)
        : uniformTextureSetter(gl.TEXTURE_2D,)

    case gl.SAMPLER_CUBE:
      return isArray
        ? uniformTexturesSetter(gl.TEXTURE_CUBE_MAP, uniformInfo.size)
        : uniformTextureSetter(gl.TEXTURE_CUBE_MAP,)

    default:
      throw ("Unknown uniform type in WebGLActiveInfo: 0x" + uniformInfo.type.toString(16)) 
  }
}

function uniformSetter(uniformType) {
  return function(v) {
    gl.[uniformType](location, v)
  }
}

function uniformMatrixSetter(uniformType) {
  return function(v) {
    gl.[uniformType](location, false, v)
  }
}

function uniformTextureSetter(samplerAddr, textureUnit) {
  return function(texture, textureUnit) {
    gl.uniform1i(location, textureUnit)
    gl.activeTexture(gl.TEXTURE0 + textureUnit)
    gl.bindTexture(samplerAddr, texture)
  }
}

function uniformTexturesSetter(samplerAddr, textureUnit, size) {
  const textureUnit = 0
    const units = []
    for (let i = 0; i < size; ++i) {
      units.push(textureUnit++)
    }
    return function(textures) {
      gl.uniform1iv(location, units)
      textures.forEach(function(texture, i) {
        gl.activeTexture(gl.TEXTURE0 + units[i])
        gl.bindTexture(samplerAddr, texture)
      })
    }
}
