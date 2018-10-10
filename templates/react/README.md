<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <img width="200" height="200" src="https://cdn.rawgit.com/standard/standard/master/sticker.svg">
  </a>
  <h1>mete-boilerplate</h1>
</div>

Powered by mete-cli

react development environment, inspired by [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) and [dvajs
](https://github.com/dvajs/dva).


demo site:[https://godotdotdot.github.io/mete-boilerplate/](https://godotdotdot.github.io/mete-boilerplate/)

## Features

- Dynamic Import
- Code Splitting
- i18n
- Decorator Support

## TODO:
- 自动安装缺失依赖
- 打开浏览器窗口
- 自动选择端口


[![](https://travis-ci.org/GoDotDotDot/mete-boilerplate.svg?branch=master)](https://travis-ci.org/GoDotDotDot/mete-boilerplate) 

## Getting Started

### Installation

```shell
$ npm install 
or
$ yarn
```

### Development Environment

Before starting your project, you should run `npm run build:dll` for building dll files! Otherwise, you will get the following error message.

```shell
The following Webpack DLL manifest is missing: react_vendor_manifest.json
Expected to find it in /Volumes/Mac2/CHUKUI/PROJECTS/mete-boilerplate/dll
Please run: npm run build:dll
```

```Shell
$ npm run dev
```

### Production Environment

```Shell
$ npm run build
```

### DLL Build

```shell
$ npm run build:dll
```

## Project Structure

- You will write your app in the `app` folder. This is the folder you will spend most.
- The `server` folder contains development and production server configuration files.
- ...

```scheme
--app
  |--@redux-----------------------------redux相关文件夹
  |--asserts----------------------------静态文件
     |--images--------------------------图片
  |--commom-----------------------------公共文件(css、nav等等)
  |--components-------------------------组件
  |--messages---------------------------i18n所需的message
  |--pages------------------------------路由页面
  |--template---------------------------模板文件
  |--tests------------------------------单元测试
  |--translations-----------------------i18n翻译文件
  |--utils------------------------------工具文件
  |--app.js-----------------------------入口文件
  |--app.layout.js----------------------视图文件
  |--configureStore.js------------------redux配置的store，包含依赖注入
  |--i18n.js----------------------------i18n
  |--manifest.json----------------------清单文件
  |--reducers.js------------------------reducer注入的地方
  |--thenm.less-------------------------antd所需的主题文件
--build---------------------------------生产模式打包的文件
--config--------------------------------配置文件夹
  |--webpack----------------------------webpack配置文件
--dll-----------------------------------动态链接库文件，仅开发阶段使用
--scripts-------------------------------脚本文件
--server--------------------------------服务端启动的地方，可以注入api等，也是开发模式启动的地方
--.browserslistrc-----------------------浏览器列表，用于autoprefixer
--.gitignore----------------------------github忽略文件
--.travis.yml---------------------------ci配置文件
--LICENSE-------------------------------证书
--README.md
--config.js-----------------------------辅助配置文件，用于替代package.json文件中的相关配置
--package.json--------------------------包文件
--postcss.config.js---------------------postcss
```





