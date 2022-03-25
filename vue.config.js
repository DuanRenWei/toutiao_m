const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const { defineConfig } = require('@vue/cli-service')

const BASE_URL = process.env.NODE_ENV === 'production' ? '/xxx/' : '/'

module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: true,
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包不生成.map文件
  productionSourceMap: false,
  // 代理配置
  devServer: {
    proxy: {
      // 将 http://127.0.0.1:7001 印射为/api
      '/api/v1': {
        target: 'http://127.0.0.1:7001', // api 服务器地址
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, // 代理 websocket
        changeOrigin: true // 是否跨域
        // pathRewrite: {
        //   // 如果本身的接口地址就有 '/api' 这种通用前缀，也就是说 http://127.0.0.1:7001/api，就可以把 pathRewrite 删掉。
        //   '^api': ''
        // }
      }
    }
  }
})
