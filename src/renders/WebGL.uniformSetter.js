import {isEqualArray, copyArray, layoutToArray} from './setUniform.js'

/**
 * -- Caches --
 * Float32Array caches used for uploading Matrix uniforms
 */
const mat4Float32Array = new Float32Array(16)
const mat3Float32Array = new Float32Array(9)
const mat2Float32Array = new Float32Array(4)

/**
 * -- Uniform Setters --
 */
// Snigle scalar
function setUniform1f(gl, v) {
	const cache = this.cache
	if (cache[0] === v) return

	gl.uniform1f(this.addr, v)
	cache[0] = v
}

function setUniform1i(gl, v) {
	const cache = this.cache
	if (cache[0] === v) return

	gl.uniform1i(this.addr, v)
	cache[0] = v
}

// Single float vector from flat array or object
function setUniform2fv(gl, v) {
	const cache = this.cache
  let values = v
  if ('x' in v) values = layoutToArray(v, 'xy')

  if (arraysEqual(cache, values)) return 

  gl.uniform2fv(this.addr, values)
  copyArray(cache, values)
}

function setUniform3fv(gl, v) {
	const cache = this.cache
  let values = v
  if ('x' in v) values = layoutToArray(v, 'xyz')
  else if ('r' in v) values = layoutToArray(v, 'rgb')

  if (arraysEqual(cache, values)) return 

  gl.uniform3fv(this.addr, values)
  copyArray(cache, values)
}

function setUniform4fv(gl, v) {
	const cache = this.cache
  let values = v
  if ('x' in v) values = layoutToArray(v, 'xyzw')

  if (arraysEqual(cache, values)) return 

  gl.uniform4fv(this.addr, values)
  copyArray(cache, values)
}

// Single matrix (from flat array or MatrixN)
function setUniform2fm(gl, v) {
	const cache = this.cache

	if ('elements' in v) {
    const elements = v.elements
		if (arraysEqual(cache, elements)) return

    mat2Float32Array.set(elements) 
		gl.uniformMatrix2fv(this.addr, false, mat2Float32Array)
		copyArray(cache, elements)

	} else {
		if (arraysEqual(cache, v)) return

		gl.uniformMatrix2fv(this.addr, false, v)
		copyArray( cache, v)
	}
}

function setUniform3fm(gl, v) {
	const cache = this.cache

	if ('elements' in v) {
    const elements = v.elements
		if (arraysEqual(cache, elements)) return

    mat3Float32Array.set(elements) 
		gl.uniformMatrix3fv(this.addr, false, mat3Float32Array)
		copyArray(cache, elements)

	} else {
		if (arraysEqual(cache, v)) return

		gl.uniformMatrix3fv(this.addr, false, v)
		copyArray( cache, v)
	}
}

function setUniform4fm(gl, v) {
	const cache = this.cache

	if ('elements' in v) {
    const elements = v.elements
		if (arraysEqual(cache, elements)) return

    mat4Float32Array.set(elements) 
		gl.uniformMatrix4fv(this.addr, false, mat4Float32Array)
		copyArray(cache, elements)

	} else {
		if (arraysEqual(cache, v)) return

		gl.uniformMatrix4fv(this.addr, false, v)
		copyArray( cache, v)
	}
}

// Single texture (2D/Cube)
function setUniformTexture2D(gl, v, renderer) {
	const cache = this.cache
	const unit = renderer.allocTextureUnit()

	if (cache[0] !== unit) {
		gl.uniform1i(this.addr, unit)
		cache[0] = unit
	}

	renderer.setTexture2D(v || emptyTexture, unit)
}

function setUniformTextureCube(gl, v, renderer) {
	const cache = this.cache
	const unit = renderer.allocTextureUnit()

	if (cache[0] !== unit) {
		gl.uniform1i(this.addr, unit)
		cache[0] = unit
	}

	renderer.setTextureCube(v || emptyCubeTexture, unit)
}

// Integer / Boolean vectors or arrays thereof (always flat arrays)
function setUniform2iv( gl, v ) {
	const cache = this.cache
	if (arraysEqual(cache, v)) return

	gl.uniform2iv(this.addr, v)
	copyArray(cache, v)
}

function setUniform3iv( gl, v ) {
	const cache = this.cache
	if (arraysEqual(cache, v)) return

	gl.uniform3iv(this.addr, v)
	copyArray(cache, v)
}

function setUniform4iv( gl, v ) {
	const cache = this.cache
	if (arraysEqual(cache, v)) return

	gl.uniform4iv(this.addr, v)
	copyArray(cache, v)
}

/**
 * Single unifrom setter
 */
function getSingularSetter( type ) {
	switch ( type ) {
		case 0x1406: return setUniform1f  // float
		case 0x8b50: return setUniform2fv // float_vec2
		case 0x8b51: return setUniform3fv // float_vec3
		case 0x8b52: return setUniform4fv // float_vec4

		case 0x8b5a: return setUniform2fm // float_mat2
		case 0x8b5b: return setUniform3fm // float_mat3
		case 0x8b5c: return setUniform4fm // float_mat4

		case 0x8b5e:
    case 0x8d66: return setUniformTexture2D    // sampler_2d, sampler_external_oes
		case 0x8b60: return setUniformTextureCube  // sampler_cube

		case 0x1404:
    case 0x8b56: return setUniform1i  // int, bool
		case 0x8b53:
    case 0x8b57: return setUniform2iv // int_vec2, bool_vec2
		case 0x8b54:
    case 0x8b58: return setUniform3iv // int_vec3, bool_vec3
		case 0x8b55: 
    case 0x8b59: return setUniform4iv // int_vec4, bool_vec4 
	}
}

function SingleUniform( nameId, activeInfo, addr ) {
	this.id = nameId
	this.addr = addr
	this.cache = []
	this.setValue = getSingularSetter(activeInfo.type)
}


function parseUniform(activeInfo, addr, container) {
	let activeName = activeInfo.name
  let isArray = false

  if (activeName.substr(-3) === "[0]") {
    if (uniformInfo.size > 1) isArray = true
    activeName = activeName.substr(0, name.length - 3)
  }

  const uniformSetter = isArray ? new SingleUniform(nameId, activeInfo, addr) : new ArrayUniform( nameId, activeInfo, addr)
	container.seq.push(uniformSetter)
	container.map[uniformSetter.id] = uniformSetter
}

