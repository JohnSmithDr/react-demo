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

/* setup ejs template engine */
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './src/views'));

/* setup static directories */
app.use('/build', express.static(path.resolve(__dirname, './build')));

/* setup webpack */
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res) {
  logger.debug(req.url);
  res.render('index');
});

/* handling error */
app.use(function(err, req, res, next) {
  logger.error(err);
  res.status(500).send('Something broke!');
});

var serverPort = config.get('server.port');
app.listen(serverPort, (err) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info('Listening at http://localhost:', serverPort);
});