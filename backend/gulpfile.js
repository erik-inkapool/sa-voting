var gulp = require('gulp');
var webpack = require('webpack');
var nodemon = require('nodemon');
var path = require('path');

var webpackConfig = require('./webpack.config.js');

gulp.task('build', function(done) {
  webpack(webpackConfig).run(onBuild(done));
});

gulp.task('watch', function() {
  webpack(webpackConfig).watch(100, function(err, stats) {
    onBuild()(err, stats);
    nodemon.restart();
  });
});

gulp.task('run', ['watch'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build/server.js'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop',
    debug: true
  })
    .on('start', function() {
      console.log('Nodemon has started');
    })
    .on('quit', function() {
      console.log('Nodemon has quit');
    })
    .on('restart', function() {
      console.log('Nodemon is restarting!');
    });
});

gulp.task('default', ['run']);

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) {
      done();
    }
  };
}
