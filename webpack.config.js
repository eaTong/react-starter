const path = require('path');
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mainColor = '#33ab9a';
const buildPath = path.resolve(__dirname, 'dist/application');

module.exports = {
  devtool: 'cheap-module-source-map',
  mode:'development',
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': path.resolve('src'),
      'ajax': path.resolve('src/framework/ajaxUtil'),
      'framework': path.resolve('src/framework'),
      'components': path.resolve('src/components'),
      'images': path.resolve('src/images'),
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('development')
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      path: buildPath,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ],
  module: {
    unknownContextCritical : false,
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoPrefixer]
            }
          }]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoPrefixer]
            }
          }, {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modules: false,
              javascriptEnabled: true,
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
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
