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

    // 设置顶点位置
    const n = initVertexBuffers(gl)
    
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, n)
  }

  function initVertexBuffers(gl) {
    // vertices 每两个组成一个点坐标
    const vertices = new Float32Array([
      0.0, 0.5, 
      -0.5, -0.5, 
      0.5, -0.5,
    ])
    const size = new Float32Array([10.0, 20.0, 30.0])
    const n = 3

    // 创建缓冲区对象
    const vertexBuffer = gl.createBuffer()
    const sizeBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 将缓存区对象分配给一个 attribute 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    // 开启缓冲区
    gl.enableVertexAttribArray(a_Position)

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW)
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    // 将缓存区对象分配给一个 attribute 变量
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_PointSize)

    return n
  }


  main()
})