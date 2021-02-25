ready(() => {
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord;
    void main() {
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
    }
  `
  const FSHADER_SOURCE = `
    precision mediump float;
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;
    void main() {
      gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    }
  `

  function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

    // 设置顶点位置
    const n = initVertexBuffers(gl)
    gl.clearColor(0.0, 0.0, 0.0, .1)
    
    loadImg('../assets/transformationMatrix.jpg')
      .then(img => {
        loadTexture(gl, n, img)
      })

  }

  function initVertexBuffers(gl) {
    const verticesTexCoords = new Float32Array([
      -0.5, 0.5, 0.0, 1.0,
      -0.5, -0.5, 0.0, 0.0,
      0.5, 0.5, 1.0, 1.0,
      0.5, -0.5, 1.0, 0.0,
    ])
    const n = 4
    const FSIZE = verticesTexCoords.BYTES_PER_ELEMENT

    // 创建缓冲区对象
    const vertexTexCoordBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW)

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
    
    // 开启缓冲区
    gl.enableVertexAttribArray(a_Position)
    gl.enableVertexAttribArray(a_TexCoord)

    return n
  }

  function loadImg(url) {
    const image = new Image()

    return new Promise((resolve, reject) => {
      image.src = url
      image.onload = () => resolve(image)
      image.onerror = (err) => reject(err)
    })
  }

  function loadTexture(gl, n, image) {
    const texture = gl.createTexture()
    const u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler')
    
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    
    gl.uniform1i(u_Sampler, 0)

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
  }

  main()
})