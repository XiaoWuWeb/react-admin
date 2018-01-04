const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/' // 静态资源文件引用时路径前缀
  },
  module: {// 配置浏览器知道jsx代码
    rules: [
      {
        enforce: 'pre', // 在代码执行前先代码规范eslint
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [// 不需要代码规范检测
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
