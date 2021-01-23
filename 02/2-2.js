ready(() => {
  const canvas = document.getElementById('webgl')
  const gl = getWebGLContext(canvas)

  gl.clearColor(.2, .3, .1, 1) // OpenGL 的颜色分量取值为0.0~1.0，而不是0~255
  gl.clear(gl.COLOR_BUFFER_BIT)
})