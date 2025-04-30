// 前端工程的自动化
const files = require.context('./modules', true, /\.js$/)

const modules = {}
files.keys().forEach((key) => {
  // 提取文件名（去掉 './' 和 '.js'）
  const name = key.replace(/^\.\//, '').replace(/\.js$/, '')
  modules[name] = files(key).default || files(key)
})

export default modules
