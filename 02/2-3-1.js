ready(() => {
  // 顶点着色器，GLSL ES 语言
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;

    void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
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

    // 省略错误处理
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

    // 获取 attribute 变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')

    /**
     * 将顶点位置传输给着色器中对应的 attribute 变量，现在可以在编程时随意改变着色器中的 attribute 变量的值
     */
    
    /**
    * 1、vertexAttrib3f,vec4 接收4个矢量，当省略第4个时，webgl会自动为你填充1.0。
    * gl.vertexAttrib4f(a_Position, 0.5, 0.5, 0.0, 1.0)
    * 
    * 2、试用矢量版的 vertexAttrib3fv
    * gl.vertexAttrib4fv(a_Position, new Float32Array([1.0, 2.0, 3.0, 1.0]))
    */

    // gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0)
    gl.vertexAttrib4fv(a_Position, new Float32Array([0.5, 0.5, 0.0, 1.0]))
    gl.vertexAttrib1f(a_PointSize, 15.0)
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
  }

  main()
})