'use strict';

var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules_dir, 'react/dist/react.min.js');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/main.js')
  ],
  resolve: {
    alias: {
      'react': pathToReact
    }
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
      }
    ],
    noParse: [pathToReact]
  }
};