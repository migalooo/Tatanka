export function loadImage(src) {
  return new Promise(function(resolve, reject) {
    const image = new Image()
    image.src = src 
    image.onload = function() {
      resolve(image)
    }
    image.onerror = function() {
      reject(new Error('Image loading error'))
    }
  })
}
