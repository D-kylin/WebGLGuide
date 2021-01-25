ready(() => {
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;

    void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
    }
  `
  const FSHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `

  function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')

    gl.vertexAttrib1f(a_PointSize, 15.0)
    
    // 在 canvas 上注册鼠标点击事件
    canvas.onmousedown = function(e) {
      click(e, gl, canvas, a_Position)
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }


  const g_points = []
  function click(event, gl, canvas, a_Position) {
    let x = event.clientX
    let y = event.clientY
    const rect = event.target.getBoundingClientRect()

    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)

    // 添加点坐标
    g_points.push([x, y])

    gl.clear(gl.COLOR_BUFFER_BIT)
    for (let point of g_points) {
      const [x, y] = point
      // 设置每个点对应的矢量
      gl.vertexAttrib3f(a_Position, x, y, 0.0)

      gl.drawArrays(gl.POINTS, 0, 1)
    }
  }


  main()
})