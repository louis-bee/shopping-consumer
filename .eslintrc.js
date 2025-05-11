// ESLint 配置文件
module.exports = {
  root: true, // 表示此 ESLint 配置文件是项目根配置
  env: {
    node: true // 定义脚本运行的环境为 Node.js
  },
  extends: [
    'plugin:vue/essential', // 继承 Vue.js 相关的基本规则
    '@vue/standard' // 继承 Vue.js 官方推荐的规则
  ],
  parserOptions: {
    parser: '@babel/eslint-parser' // 使用 Babel 解析器，支持 ES6+ 语法
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 在生产环境下禁止使用 console，开发环境下忽略
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 在生产环境下禁止使用 debugger，开发环境下忽略
    'vue/multi-word-component-names': 'off' // 允许单文件组件名使用单个单词
  }
}
