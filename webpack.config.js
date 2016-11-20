/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

module.exports = {

  //没有path 是因为webpack-dev-server是从内存中读取文件的而不是磁盘
  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true, //webpack-dev-server开启增量编译
  debug: true, //开启loaders的debug模式
  devtool: 'sourcemap', //在dev tool 生成sourcemap 方便调试
  entry: [
      'webpack/hot/only-dev-server',// /Users/shaokaiming/Playground/gallery-in-react/node_modules/webpack/hot/only-dev-server.js
      './src/components/GalleryByReactApp.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  //为module解析路径
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {//别名设置
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },
  //定义影响各个module的选项
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader'// es6 -> es5 transpiling compiling
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};

