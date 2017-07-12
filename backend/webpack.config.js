var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs
  .readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './server.js',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: nodeModules,
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-2', 'es2015'],
            cacheDirectory: true,
            plugins: ['transform-runtime']
          }
        }
      }
    ]
  },
  devtool: '#eval-source-map'
};
