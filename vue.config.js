const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 3003
module.exports = {
  publicPath: '/',
  chainWebpack: (config) => {
    // 配置路径别名
    config.resolve.alias
      .set('utils', resolve('/src/utils'))
      .set('views', resolve('/src/views'))
      .set('api', resolve('/src/api'))
  },
  devServer: {
    port,
    disableHostCheck: true,
    open: true,
    /*
      在express服务内，提供在所有其他中间件之前，执行自定义中间件的能力；
      这可以定义自定义的处理函数；（如：新增后台路由）
      我们这里主要用来mock数据
    */
    before: require('./mock/mock-server.js')
    /* proxy: {
      '/api': {
        target: 'http://api.wuzhe.online',
        pathRewrite: {
          '^/api': ''
        }
      }
    } */
  }
}
