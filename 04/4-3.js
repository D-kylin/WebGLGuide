ready(() => {
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;
    void main() {
      gl_Position = u_ModelMatrix * a_Position;
    }
  `
  const FSHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
  `
  // 旋转速度(度/秒)
  const ANGLE_STEP = 45.0

  function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

    // 设置顶点位置
    const n = initVertexBuffers(gl)
    // 清除背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
    // 为旋转矩阵创建Matrix4对象
    const modelMatrix = new Matrix4()
    let currentAngle = 0.0
    
    const tick = function() {
      currentAngle = animate(currentAngle)
      draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix)
      requestAnimationFrame(tick)
    }

    tick()
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

  function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    // 改变转角
    modelMatrix.setRotate(currentAngle, 0, 0, 1)
    modelMatrix.translate(0.85, 0, 0)
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