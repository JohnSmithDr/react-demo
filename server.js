'use strict';

/* the server app build on express */

var path = require('path');
var config = require('config');
var express = require('express');
var logger = require('tracer').colorConsole();
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var app = express();
var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  logger.debug(req.url);
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

var serverPort = config.get('server.port');
app.listen(serverPort, (err) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info('Listening at http://localhost:', serverPort);
});