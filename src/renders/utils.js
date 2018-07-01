function arraysEqual(a, b) {
  if (a.length !== b.length) return false
  let i
	for (i=0, len=a.length; i<len; i++) {
    if (a[i] !== b[i]) return false
	}
  return true
}

function copyArray(a, b) {
  let i
	for (i=0, len=a.length; i<len; i++) {
    a[i] = b[i]
	}
}

function layoutToArray(v, type) {
  switch (type) {
    case 'xy':
      return [v.x, v.y]
    case 'xyz':
      return [v.x, v.y, v.z]
    case 'xyzw':
      return [v.x, v.y, v.z, v.w]
    case 'rgb':
      return [v.r, v.g, v.b]
  }
}

export {
  arraysEqual,
  copyArray,
  layoutToArray
}
