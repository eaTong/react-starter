const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoPrefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VariableReplacerPlugin = require('webpack-variable-replacer-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const webContextRoot = '';

module.exports = {
  devtool: 'cheap-module',
  mode: 'production',
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.js'
    ],
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    path: buildPath,
    filename: '[name]_[chunkhash:8].js',
    publicPath: webContextRoot
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': path.resolve('src')
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
          NODE_ENV: JSON.stringify('production')
        }
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new VariableReplacerPlugin({
      matchVariables: {
        main: '#456789',
        border: '1px solid #345678',
        background: 'rgba(0, 0, 0, 0.15)'
      }
    })
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
