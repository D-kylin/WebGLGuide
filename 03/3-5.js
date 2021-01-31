ready(() => {
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform float u_CosB, u_SinB;
    void main() {
      gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
      gl_Position.y = a_Position.x * u_SinB - a_Position.y * u_CosB;
      gl_Position.z = a_Position.z;
      gl_Position.w = 1.0;
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

    // 将旋转图形所需对数据传输给顶点着色器
    const radian = Math.PI * ANGLE / 180.0 //转为弧度制
    const cosB = Math.cos(radian)
    const sinB = Math.sin(radian)
    
    const u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
    const u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
    gl.uniform1f(u_CosB, cosB)
    gl.uniform1f(u_SinB, sinB)
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