module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-plugin': {},
    // cssnano: ctx.env === 'production' ? {} : false,
    autoprefixer: {}
  }
})
