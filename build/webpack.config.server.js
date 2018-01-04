const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  target: 'node', // 执行环境
  entry: {// 应用入口
    app: path.join(__dirname, '../client/server-entry.js')// 绝对输出路径
  },
  output: {// 输出口
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'// 加载方案，适用于nodejs
  }
})
