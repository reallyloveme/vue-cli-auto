const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')   //这里引入插件
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')      // 复制文件
// const config = require('../vue.config')
const webpack = require('webpack')
const HappyPack = require('happypack')     //单进程转多进程
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const publickPath = process.cwd()
// console.log(path.resolve(publickPath, './src/main.js'))
// console.log(path.resolve(__dirname, '../src/main.js'))
// console.log(path.resolve(publickPath, 'dist'))

function resolve(dir) {
  return path.join(__dirname, '...', dir)
}

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src') + '/main.js',
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.join(__dirname, 'dist'),
    chunkFilename: 'js/[name].[hash:8].js',  //异步加载模块
    publicPath: './'
    // publicPath: config.publicPath || './'
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=happyBabel'],
        exclude: /node_modules/,
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]',
                  publicPath: '../'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                  publicPath: '../'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'font/[name].[hash:8].[ext]',
                  publicPath: '../'
                }
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
  //插件注入
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new HappyPack({
      id: 'happyBabel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool
    }),
    new vueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
  ]
}