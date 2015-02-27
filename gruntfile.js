module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['*.js', 'email/*.js', 'data/*.js']
    },
    checkDependencies: {
        this: {
            options: {
                install: true,
            },
        },
    },
    nodemon: {
      all: {
        script: 'app.js',
        options: {
          watch: ['.', 'config'],
          ext: 'js,swig,json',
          legacyWatch: true
        }
      }
    }
  });

  // load up the tasks automagically
  require('load-grunt-tasks')(grunt);
 
  // Default task(s).
  grunt.registerTask('default', ['checkDependencies', 'jshint', 'nodemon']);
};