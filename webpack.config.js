var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/index.js',
  output: {
    path: path.join(__dirname, 'server', 'public'),
    filename: 'script.js'
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".json"]
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.html$/, loader: 'text-loader' },
      { test: /\.[woff|woff2]/, loader: 'url-loader' }
    ]
  }
};