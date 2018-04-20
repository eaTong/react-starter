/**
 * Created by 7wingsfish on 2016/4/25.
 */
const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    app: ['babel-polyfill', path.resolve(APP_PATH, 'index.js')],
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new HtmlwebpackPlugin({
      template: path.resolve(ROOT_PATH, 'index-production.html'),
      filename: 'index.html',
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
    rules: [{
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'postcss-loader', options: {
          plugins: [autoPrefixer]
        }
      }]
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'postcss-loader', options: {
            plugins: [autoPrefixer]
          }
        }, {
          loader: 'less-loader',
          options: {javascriptEnabled: true}
        }
      ]
    },
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      }, {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: '[name]_[hash:8].[ext]'
          }
        }

      }, {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            mimetype: 'application/font-woff',
            name: '[name]_[hash:8].[ext]'
          }
        }
      }
    ]
  }
};
