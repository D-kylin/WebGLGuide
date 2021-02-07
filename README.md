# 《WebGL编程指南》 读书札记

Tips: 可试用 Visual Studio Code 编辑器进行代码编写查阅，搭配 Live Server 插件可以实时查看效果更新

***
* *作者：Kouichi Matsuda Rodger lea*
* *译者：谢光磊*
* *2014.6 第一版*
* [书籍网站及其官方源码](https://sites.google.com/site/webglbook/)
* **手写代码，相比于书籍源代码，结合了自己的理解和写代码的习惯**
***

## 目录
### Chapter 1 - 简介
### Chapter 2 - WebGL 入门
* [2-1](./02/2-1.js) - 用 canvas API 绘制图案
* [2-2](./02/2-2.js) - 用 webgl API 绘制图案
* [2-3](./02/2-3.js) - 用 webgl API 绘制一个点
  * [2-3-1](./02/2-3-1.js) - 使用 GLSL ES 的 attribute 变量
* [2-4](./02/2-4.js) - 添加事件联动
  
attribute 只用在顶点着色器，uniform 可以用在顶点和片元着色器

### Chapter 3 - 绘制和变换三角形
* [3-1](./03/3-1.js) - 使用缓冲区对象
* [3-2](./03/3-2.js) - 绘制三角
* [3-3](./03/3-3.js) - 绘制矩形（由两个三角形组成）
* [3-4](./03/3-4.js) - 点平移
* [3-5](./03/3-5.js) - 点旋转
* [3-6](./03/3-6.js) - 变换矩阵(Transformation matrix)

[常见变换矩阵推导--平移、旋转](./assets/transformationMatrix.jpg)

### Chapter 4 - 高级变换与动画基础
* [4-1](./04/4-1.js) - 初步使用 Matrix4 对象
* [4-2](./04/4-2.js) - 复合变换
* [4-3](./04/4-3.js) - 动画（更新三角形->绘制三角形->再次调用更新，不断重复）

使用多个基本变换组合实现复杂变换，初步了解动画的原理