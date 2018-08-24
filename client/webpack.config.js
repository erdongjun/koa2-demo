const path = require('path')
const Webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 拆分css样式的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: "development", //打包为开发模式
    // 入口文件
    entry: {
        index: './src/index.js',
        vendor: ['react', 'react-dom', 'antd']
    },
    // 输出文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[hash].js',
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial', // 
                    name: 'vendor', // 入口的entry的key
                    enforce: true   // 强制 
                }
            }
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,               // 匹配js文件
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src'),             // 匹配时查找的范围
                query: {
                    presets: ['stage-0', 'react'],
                    plugins: [
                        [
                            "import",
                            { libraryName: "antd", style: "css" },
                            "transform-async-to-generator",
                            "transform-regenerator",
                            "transform-runtime"
                        ],
                    ]
                },
            },
            // 解析css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader"
                })
            },
            // scss
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader!sass-loader"
                })
            },
            // 解析字体文件
            {
                test: /\.(ttf|woff|svg|eot|woff2)$/,
                loader: 'url-loader?limit=8192&name=./static/font/[name].[ext]'
            },
            // 图片加载
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
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
    devServer: {
        // 设置服务器访问的基本目录
        contentBase: path.resolve(__dirname, 'dist'), //最好设置成绝对路径
        // 设置服务器的ip地址,可以是localhost
        host: 'localhost',
        historyApiFallback: true,
        // 设置端口
        port: 8090,
        // 设置自动拉起浏览器
        open: true,
        // 设置热更新
        hot: true,
        proxy: {
            '/api': {
              target: 'http://localhost:3000',
              pathRewrite: {'^/api' : ''}
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
        new ExtractTextPlugin("styles-[hash].css"),
        new Webpack.HotModuleReplacementPlugin(), //调用webpack的热更新插件
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: 'body',
        }),
    ]

}