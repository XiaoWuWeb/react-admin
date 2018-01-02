const path = require('path')

module.exports = {
  target: 'node', // 执行环境
  entry: {// 应用入口
    app: path.join(__dirname, '../client/server-entry.js')// 绝对输出路径
  },
  output: {// 输出口
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public', // 静态资源文件引用时路径前缀
    libraryTarget: 'commonjs2'// 加载方案，适用于nodejs
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
