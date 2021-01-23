ready(() => {
  const canvas = document.getElementById('webgl')
  if (!canvas) {
    console.log('Failed to retrieve to the <canvas> Element')
    return
  }

  // 获取绘制二维图形的上下文
  const ctx = canvas.getContext('2d')

  // 绘制图案
  ctx.fillStyle = 'rgba(0, 0, 255, 1)' // 填充颜色为蓝色
  ctx.fillRect(10, 120, 150, 50) // 绘制矩形，参数分别是：x轴距离，y轴距离，宽度，高度
})