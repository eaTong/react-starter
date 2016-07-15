var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:  {
    app: path.resolve(APP_PATH, 'index.js')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath:'static'
  },
  devtool: '#eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port:3000,
    proxy:{
      // "/api/*" :'http://139.129.33.188'//开发版地址
      "/api/*" :'http://localhost:8090'//周夷东内网
      // "/api/*" :'http://192.168.0.172:8090'//董新强内网
    }
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: path.resolve(ROOT_PATH, 'index.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['app'],
      //要把script插入到标签里
      inject: 'body'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    },{
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    },{
      test: /\.less/,
      loaders: ["style", "css", "less"]
    }, {
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  }
};
