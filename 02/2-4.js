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
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      gl_FragColor = u_FragColor;
    }
  `

  function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    
    // 获取
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

    gl.vertexAttrib1f(a_PointSize, 10.0)
    
    // 在 canvas 上注册鼠标点击事件
    canvas.onmousedown = function(e) {
      click(e, gl, canvas, a_Position, u_FragColor)
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }


  const g_points = []
  const g_colors = []
  function click(event, gl, canvas, a_Position, u_FragColor) {
    let x = event.clientX
    let y = event.clientY
    const rect = event.target.getBoundingClientRect()

    /**
     * 注意：这里的 x、y 值计算与书本有差异，经过实践，发现是书本印刷有误
     * 
     * x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
     * y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)
     */
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2)
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2)

    // 添加点坐标
    g_points.push([x, y])
    
    // 添加颜色
    if (x >= 0.0 && y >= 0.0) {
      g_colors.push([1.0, 0.0, 0.0, 1.0])
    } else if (x < 0.0 && y < 0.0) {
      g_colors.push([0.0, 1.0, 0.0, 1.0])
    } else {
      g_colors.push([1.0, 1.0, 1.0, 1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT)
    for (let i = 0; i < g_points.length; i++) {
      const [x, y] = g_points[i]
      const [r, g, b, a] = g_colors[i]
      // 设置每个点对应的矢量
      gl.vertexAttrib3f(a_Position, x, y, 0.0)

      // 设置每个点的颜色
      gl.uniform4f(u_FragColor, r, g, b, a)

      gl.drawArrays(gl.POINTS, 0, 1)
    }
  }


  main()
})