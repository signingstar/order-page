var webpackConfig = require("./webpack.config")
var path = require("path")

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon', 'es6-shim'],
    files: [
      'tests/client/**/*.test.js',
      'tests/server/**/*.test.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'tests/**/*.js': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  })
}
