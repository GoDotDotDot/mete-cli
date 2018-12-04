# ChangeLog

## mete-cli v 1.0.24 (2018-10-15)

### Features

- Add file detector that init command creat new project.

## mete-cli v 1.0.25 (2018-10-26)

### Features

- Add production server support.
```shell
mete prod
```
- Modify webpack config files.
- Fixed webpack production build exception(lose some css).

## mete-cli v 1.0.26 (2018-10-27)

### Bug

- Fixed `NODE_ENV` value is `production` when run `mete`.

## mete-cli v 1.0.29 (2018-11-25)

### Features

- Add `mete.config.js` file in the root directory.

### Bug

- Fixed the terminal print 'can't resolve ./locale' issue.

## mete-cli v 1.0.30 (2018-11-26)

### Features

- Add template for h5.
```shell
mete init --temp=react-h5
```
- Remove some dependencies that unused.

### Bug

- Fixed package.json not been formated.
- Fixed cannot find module 'webpack' issue.

## mete-cli v 1.0.31 (2018-11-26)

### Bug

- Fixed .babelrc for antd error in react template.

## mete-cli v 1.1.0 (2018-11-27)

### Features

- Add Immutable HOC that translate immutable data to raw JavaScript objects.

## mete-cli v 1.1.1 (2018-11-27)

### Features

- Add publicPath prefix with dot detect in the webpack config.
- The root directory of static file serve in production server will read from publick path in the webpack config file.
- The target root directory of building mode will read from output.path in the webpack config file.

### Bug

- Fixed generate error when use stateless function component.

## mete-cli v 1.1.2 (2018-11-27)

### Bug

- Fixed generater of containers components error and format the generater templates.

## mete-cli v 1.1.3 (2018-11-27)

### Bug

- Fixed generater of components error.

## mete-cli v 1.2.0 (2018-12-04)

### Features

- Locked the version of dependencies in templates.
- Replace HOCImmutable component with [with-immutable](https://github.com/GoDotDotDot/with-immutable) lib.


