const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: 30001, // 端口
      allowedHosts: 'consumer.brotherlouis.site'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
        // 其他别名配置
      }
    }
  }
})
