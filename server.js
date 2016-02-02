'use strict';

/* the server app build on express */

var path = require('path');
var config = require('config');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var logger = require('tracer').colorConsole();

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

var serverPort = config.get('server.port');
app.listen(serverPort, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  logger.info('Listening at http://localhost:', serverPort);
});