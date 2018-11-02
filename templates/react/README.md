<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <img width="200" height="200" src="https://github.com/GoDotDotDot/mete-cli/raw/master/logo.png">
  </a>
  <h1>mete-cli</h1>
</div>

[![npm version](https://img.shields.io/npm/v/mete-cli.svg)](https://www.npmjs.com/package/mete-cli) [![npm downloads](https://img.shields.io/npm/dt/mete-cli.svg)](https://npm-stat.com/charts.html?package=mete-cli) [![Github All Releases](https://img.shields.io/github/downloads/godotdotdot/mete-cli/total.svg)](https://github.com/GoDotDotDot/mete-cli/releases)

Universal front-end cli, we just support react enviroment now.

## Features

- Dynamic Import
- Code Splitting
- i18n
- Decorator Support
- react-erro-overlay support
- Auto restart server after modified config(mete.config.js and .eslintrc)
- HMR support
- Custom webpack, eslint, babel config support
- Redux ecosystem support
- Displaying lint output in the editor
- Sass support
- Less support
- Launch editor support (Please sure that editor command has been intalled in PATH)
- Production server support
- DLL support

## TODO:
- 自动安装缺失依赖
- 打开浏览器窗口
- 自动选择端口
- 升级postcss-prese-env
- 升级browserlist 到3

## Getting Started

### Installation

```shell
$ npm install -g mete-cli
or 
$ yarn global add mete-cli (recommend)
```

### Usage

1. Create an new project

```shell
$ mete init my-app
```

2. Start in development 

```shell
$ mete dev
```

### Development Environment

Before starting your project, you should run `mete dll` for building dll files! Otherwise, you will get the following error message.

```shell
The following Webpack DLL manifest is missing: react_vendor_manifest.json
Expected to find it in /Volumes/Mac2/CHUKUI/PROJECTS/mete-boilerplate/dll
Please run: mete dll
```

```Shell
$ mete dev
```
you can run `mete dev -h` for more help message.

### Production Build Environment

```shell
$ mete build [dir]
```
the default dir is dist.

you can run `mete build -h` for more help message.

### Production Environment

```shell
$ mete prod [-H] [-p]
```

you can run `mete prod -h` for more help message.

### DLL Build

```shell
$ mete dll
```

### Gennerator

We provide some code template for coding quickly.

Just use

```shell
$ mete generate
```
If something ok, you will see the list of generators.

## More

Show more usage.

```shell
$ mete -h
```

## Custom Config

For custom advanced behavior of mete, you can create a `mete.config.js` in the root of your project directory (next to `app` and `package.json`).

 `mete.config.js` is a regular Node.js module, not a JSON file. It gets used by the mete dev server and build phases, and not included in the browser build.

### Custom webpack config

In order to extend our usage of `webpack`, you can define a function that extends its config via `mete.config.js`.

**Example:**

use a function:

```
// Example mete.config.js for adding a loader that depends on scss-loader
module.exports = {
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.scss/,
      loader: 'scss-loader'
    })

    return config
  }
}
```

### Customizing babel config

In order to extend our usage of `babel`, you can simply edit a `.babelrc` file at the root of your app mete had provided. 

### Customizing eslint config

In order to extend our usage of `eslint`, you can simply edit a `.eslintrc` file at the root of your app mete had provided. 

## Project Structure

![image-20181010142046415](https://github.com/GoDotDotDot/mete-cli/raw/master/structure.png)


