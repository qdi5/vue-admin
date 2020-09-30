const path = require('path')

function resolve (dir) {
  /* eslint-disable */
  debugger
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.BASE_URL,
  chainWebpack (config) {
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('styles', resolve('src/styles'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
  },
  devServer: {
    port: '3001',
    disableHostCheck: true,
    host: '0.0.0.0',
    open: true
  }
}
