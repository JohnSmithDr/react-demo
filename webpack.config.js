'use strict';

var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules_dir, 'react/dist/react.min.js');

var deps = [
  'react/dist/react.min.js',
  'react-dom/dist/react-dom.min.js',
  'react-router/dist/react-router.min.js',
  'react-bootstrap/dist/react-bootstrap.min.js'
];

var config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/main.js')
  ],
  resolve: {
    alias: {}
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query:{
          presets:['es2015','react']
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both style-loader and css-loader
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff2"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ],
    noParse: []
  }
};

deps.forEach(dep => {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;