ready(() => {
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_xformMatrix;
    void main() {
      gl_Position = u_xformMatrix * a_Position;
    }
  `
  const FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      gl_FragColor = u_FragColor;
    }
  `
  
  const ANGLE = -90.0

  function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

    // 设置顶点位置
    const n = initVertexBuffers(gl)

    // 为旋转矩阵创建Matrix4对象
    const xformMatrix = new Matrix4()

    // 使用 Matrix4 的内置变换方法
    xformMatrix.setRotate(ANGLE, 0, 0, 1)
    // xformMatrix.setTranslate(0.5, 0.5, 0.0)

    const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix')
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements)

    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
    gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
  }

  function initVertexBuffers(gl) {
    // vertices 每两个数值组成一个点坐标
    const vertices = new Float32Array([
      0.0, 0.5, 
      -0.5, -0.5, 
      0.5, -0.5,
    ])
    const n = 3

    // 创建缓冲区对象
    const vertexBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 将缓存区对象分配给一个 attribute 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)

    return n
  }


  main()
})