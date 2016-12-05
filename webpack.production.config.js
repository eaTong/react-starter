/**
 * Created by 7wingsfish on 2016/4/25.
 */
var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, process.env.DEBUG == 'true' ? 'debug/newH5' : 'dist/newH5');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const debugENV = process.env.DEBUG_ENV;

console.log(process.env.NODE_ENV);
module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
  },
  output: {
    path: path.resolve(ROOT_PATH, debugENV + '/newH5'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG_ENV: JSON.stringify(process.env.DEBUG_ENV),
      PUBLISH_TIME: new Date().getTime(),
      NODE_ENV: JSON.stringify("production")
    }),
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new HtmlwebpackPlugin({
      template: path.resolve(ROOT_PATH, 'index-production.html'),
      filename: 'index.html',
      //版本信息
      time: new Date().getTime(),
      catchError: debugENV == 'dev' ? 'window.onerror=function(message){alert(message)}' : '',
      //要把script插入到标签里
      inject: false,
    }),
    new ExtractTextPlugin("style.css")
  ],

  resolve: {
    alias: {
      'react$': path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
      'react-dom$': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom.min.js')
    }
  },
  module: {
    postLoaders: [{
      test: /\.js$/,
      loader: "webpack-strip?strip[]=console.log",
      include: path.join(__dirname, 'src')
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    }, {
      test: /\.less/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }, {
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }, {
      test: /\.(svg|ttf)$/,
      loader: 'url?limit=100000'
    }]
  }
};
function dateFormat(val, format) {
  var date = {
    "M+": val.getMonth() + 1,
    "d+": val.getDate(),
    "h+": val.getHours(),
    "m+": val.getMinutes(),
    "s+": val.getSeconds(),
    "q+": Math.floor((val.getMonth() + 3) / 3),
    "S+": val.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (val.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
