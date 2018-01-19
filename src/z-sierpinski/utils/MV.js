/**
 * Vector Constructors
 */

function setVec(number, args) {
  const fill = Array(number).fill(0)
  if (number < 4) return args.concat(fill).splice(0, number)
  if (args.length < 4) return args.concat(fill).splice(0, 3).concat(1)
  return args.splice(0, 4)
}

function vec2() {
  const args = [].concat.apply([], arguments)
  return setVec(2, args)
}

function vec3() {
  const args = [].concat.apply([], arguments)
  return setVec(3, args)
} 

function vec4() {
  const args = [].concat.apply([], arguments)
  return setVec(4, args)
} 

/**
 * Matrix Constructiors
 */

function setMat(number, args) {
  const mat = Array(number).fill(null)
  if (args.length < 2) {
    const value = args[0] || 1
    for (let i=0; i<number; i++) {
      const fill = Array(number).fill(0)
      fill[i] = value 
      mat[i] = fill
    }
  } else {
    for (let i=0; i<number; i++) {
      const fill = args.splice(0, number)
      const isEnd = fill.length<3 
      mat[i] = setVec(number, fill) 
      if (number===4 && isEnd) mat[i][3] = 0
    }
  }
  return mat
}

function mat2() {
  const args = [].concat.apply([], arguments)
  return setMat(2, args)
} 

function mat3() {
  const args = [].concat.apply([], arguments)
  return setMat(3, args)
} 

function mat4() {
  const args = [].concat.apply([], arguments)
  return setMat(4, args)
} 

function mix(u, v, s) {
  if (typeof s !== 'number') throw  'Mix error! typeof arguments[2] must be a number'
  if (u.length !== v.length) throw 'Vector dimension mismatch'
  const result = []
  const len = u.length
  for (let i = 0; i<len; i++) {
    result.push( (1-s)*u[i] + s*v[i])
  }
  return result
}

function flatten(v) {
  let n = v.length
  let isMartix = false
  if (Array.isArray(v[0])) {
    isMartix = true
    n *= v[0].length
  }
  const floats = new Float32Array(n)

  if (isMartix) {
    let tick = 0
    const len = v.length
    for (let i=0; i<len; i++) {
      const innerLen = v[i].length
      for (let j=0; j<innerLen; j++) {
        floats[tick++] = v[i][j]
      }
    }
  } else {
    const len = v.length
    for (let i=0; i<len; i++) {
      floats[i] = v[i]
    }
  }
  return floats
}

module.exports = {
  vec2,
  vec3,
  vec4,
  mat2,
  mat3,
  mat4,
  mix,
  flatten
}
