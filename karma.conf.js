module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'js/**/*.js',
      'spec/**/*.js',
      'spec/**/*.spec.js'
    ],
    preprocessors: {
      'js/**/*.js': ['babel'],
      'spec/**/*.spec.js': ['babel']
    }
  });
};
