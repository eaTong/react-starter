const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoPrefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist/application');
const webContextRoot = '/static/application/';// 应用的实际访问路径，默认是'/'   可以试试/static/

const mainColor = '#33ab9a';

module.exports = {
  devtool: 'cheap-module',
  mode: 'production',
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.prod.js'
    ],
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    path: buildPath,
    filename: 'js/[name]_[chunkhash:8].js',
    publicPath: webContextRoot
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
  optimization: {
    splitChunks: {
      name: entrypoint => `vendor.${entrypoint.name}`
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: false,
        terserOptions: {
          ecma: 3,
          safari10: true,
          ie8: true,
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-ca|zh-cn/),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new AppCachePlugin({
      exclude: ["index.html"],
      output: '/manifest.appcache'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index-production.html'),
      path: buildPath,
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      },
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          // process.env.NODE_ENV==="production"
          // 应用代码里，可凭此判断是否运行在生产环境
          NODE_ENV: JSON.stringify('production')
        }
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoPrefixer]
            }
          }]
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoPrefixer]
            }
          }, {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }, {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: '[name].[ext]'
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
