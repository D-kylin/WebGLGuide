ready(() => {
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    uniform mat4 u_ModelMatrix;
    void main() {
      gl_Position = u_ModelMatrix * a_Position;
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

  const ANGLE_STEP = 45.0

  function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

    // 设置顶点位置
    const n = initVertexBuffers(gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 为旋转矩阵创建Matrix4对象
    const modelMatrix = new Matrix4()
    let currentAngle = 0.0
    const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')

    const tick = function() {
      currentAngle = animate(currentAngle)
      draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix)
      requestAnimationFrame(tick)
    }

    tick()

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

  function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    // 改变转角
    modelMatrix.setRotate(currentAngle, 0, 0, 1)
    // 将旋转矩阵传入顶点着色器
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
  }

  let g_last = Date.now()
  function animate(angle) {
    const now = Date.now()
    const elapsed = now - g_last
    g_last = now

    let newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0
    return newAngle %= 360
  }


  main()
})