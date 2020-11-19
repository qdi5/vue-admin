const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
/*
  process.cwd()获取nodejs运行时的当前工作目录
  这里其实就是获取mock目录
*/
const mockDir = path.join(process.cwd(), 'mock')
// 注册express路由
function registerRoutes (app) {
  debugger
  let mockLastIndex
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    // 每调用一次app.[mock.type]()，就会往express的路由栈里面新增一条记录
    app[mock.type](mock.url, mock.response)
    // app._router：express的router对象
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

// 清除路由缓存
function unregisterRoutes () {
  /*
    1、require.cache：
    被引入的模块将被缓存在这个对象中。 从此对象中删除键值对
    将会导致下一次 require 重新加载被删除的模块。
  */
  Object.keys(require.cache).forEach(i => {
    // i： 是被缓存的模块路径
    if (i.includes(mockDir)) {
      /*
        require.resolve(i):
        使用内部的 require() 机制查询模块的位置，此操作只返回解析后的文件名，不会加载该模块。
      */
      delete require.cache[require.resolve(i)] // 从缓存中删除指定文件名的缓存
    }
  })
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_REQUEST_PREFIX}${url}`),
    type: type || 'get',
    response (req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

module.exports = app => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  // 监听mock目录，当有文件更改，或新增文件时，会触发回调
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
