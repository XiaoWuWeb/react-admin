const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'// 判断是否是开发环境

const config = webpackMerge(baseConfig, {
  entry: {// 应用入口
    app: path.join(__dirname, '../client/app.js')// 绝对路径
  },
  output: {// 输出口
    filename: '[name].[hash].js' // 文件名+哈希值+类型
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
})

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 绑定本地
    port: '8888', // 端口
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {// 出错在网页显示
      errors: true// 只显示出错信息
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
