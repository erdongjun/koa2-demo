const path = require('path')
const Webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 拆分css样式的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  mode: "production", //打包为开发模式
  // 入口文件
  entry: {
    index: './src/index.js'
  },
  // 输出文件
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name]-[hash].js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/, // 匹配js文件
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'), // 匹配时忽略这个目录，提高打包速度
        include: path.resolve(__dirname, 'src'), // 匹配时查找的范围
        query: {
          presets: [
            'stage-0', 'react'
          ],
          plugins: [
            [
              "import", {
                libraryName: "antd",
                style: "css"
              },
              "transform-async-to-generator",
              "transform-regenerator",
              "transform-runtime"
            ]
          ]
        }
      },
      // 解析css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!postcss-loader"})
      },
      // scss
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!postcss-loader!sass-loader"})
      },
      // 解析字体文件
      {
        test: /\.(ttf|woff|svg|eot|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: './static/font/[name].[ext]'
            }
          }
        ]
      },
      // 图片加载
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: './imgs/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']), //传入数组,指定要删除的目录
    new ExtractTextPlugin("styles-[hash].css"),
    new htmlWebpackPlugin({filename: 'index.html', template: './index.html', inject: 'body'})
  ]

}