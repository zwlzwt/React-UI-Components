# 这是一个基于react的UI组建库，风格采用material design

### 使用方式
```bash
npm install --save react-puzzle-cell
```

### 设置less编译在webpack中

```bash
npm install style-loader --save-dev
npm install css-loader --save-dev
npm install less-loader --save-dev
```

#### 你必须安装less编译

编译 webpack 1.x 或者 2.x loader for .less files to use less:
```js
{
  test: /\.less$/,
  use: ['style-loader', 'css-loader', 'less-loader'],
},
```

#### 代码风格

Use Airbnb's [javascript code style guide](https://github.com/airbnb/javascript)

#### 本地启动方式

```bash
$ make run
```

#### 测试框架jest

测试用例稍后会补上

#### 涉及技术栈
  * react  >= 15.0.0
  * webpack >= 2.0.0
