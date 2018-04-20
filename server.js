const path = require('path');
const url = require('url');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const proxy = require('proxy-middleware');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);
const SERVER_PATH = 'https://eatong.cn/'; //beta

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));


app.use('/api', proxy(url.parse(SERVER_PATH + '/api')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
