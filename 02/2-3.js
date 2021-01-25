ready(() => {
  // 顶点着色器，GLSL ES 语言
  const VSHADER_SOURCE = `
    void main() {
      gl_Position = vec4(0.0, 0.5, 0.0, 1.0);
      gl_PointSize = 10.0;
    }
  `
  // 片元着色器
  const FSHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `

  function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      return
    }

    // 清除背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清除内容
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
  }

  main()
})