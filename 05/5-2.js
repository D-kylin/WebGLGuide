ready(() => {
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = 10.0;
      v_Color = a_Color;
    }
  `
  const FSHADER_SOURCE = `
    precision mediump float;
    varying vec4 v_Color;
    void main() {
      gl_FragColor = v_Color;
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

    gl.drawArrays(gl.TRIANGLES, 0, n)
  }

  function initVertexBuffers(gl) {
    // vertices 每两个组成一个点坐标
    const verticesColors = new Float32Array([
      0.0, 0.5, 1.0, 0.0, 0.0, // 第一个点
      -0.5, -0.5, 0.0, 1.0, 0.0, // 第二个点
      0.5, -0.5, 0.0, 0.0, 1.0, // 第三个点
    ])
    const n = 3

    const FSIZE = verticesColors.BYTES_PER_ELEMENT
    // 创建缓冲区对象
    const vertexBuffer = gl.createBuffer()
    const sizeBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 将缓存区对象分配给一个 attribute 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0)
    // 开启缓冲区
    gl.enableVertexAttribArray(a_Position)

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)
    const a_Color = gl.getAttribLocation(gl.program, 'a_Color')
    // 将缓存区对象分配给一个 attribute 变量
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2)
    gl.enableVertexAttribArray(a_Color)

    return n
  }


  main()
})