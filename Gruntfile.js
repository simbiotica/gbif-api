/**
 * Grunt
 * @param  {Object} grunt
 */
module.exports = function(grunt) {

  'use strict';

  /**
   * Load grunt modules
   */
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  /**
   * Grunt tasks configuration
   * @type {Object}
   */
  grunt.initConfig({

    root: {
      app: './app/assets',
      build: './public/assets'
    },

    /**
     * Clean task
     * @type {Object}
     */
    clean: {
      assets: ['<%= root.build %>']
    },

    /**
     * Grunt jshint task configuration
     * @type {Object}
     */
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc'
      },
      files: [
        '<%= root.app %>/scripts/{,*/}*.js',
        'app/controllers/admin/{,*/}*.js',
        'app/controllers/api/{,*/}*.js',
        'app/models/{,*/}*.js',
        'config/{,*/}*.js',
        '*.js'
      ]
    },

    /**
     * Grunt requirejs task
     * @type {Object}
     */
    requirejs: {
      compile: {
        options: {
          baseUrl: '<%= root.app %>/scripts',
          mainConfigFile: '<%= root.app %>/scripts/config.js',
          name: '../../../bower_components/almond/almond',
          out: '<%= root.build %>/scripts/admin.js'
        }
      }
    },

    /**
     * Stylus
     * @type {Object}
     */
    stylus: {
      compile: {
        options: {
          use: [
            require('fluidity')
          ]
        },
        files: {
          '<%= root.build %>/styles/main.css': '<%= root.app %>/styles/main.styl',
          '<%= root.build %>/styles/admin.css': '<%= root.app %>/styles/admin.styl',
          '<%= root.build %>/styles/auth.css': '<%= root.app %>/styles/auth.styl'
        }
      }
    },

    /**
     * cssmin task
     * @type {Object}
     */
    cssmin: {
      combine: {
        files: {
          '<%= root.build %>/styles/admin.css': [
            './bower_components/foundation/css/normalize.css',
            './bower_components/foundation/css/foundation.css',
            '<%= root.build %>/styles/admin.css'
          ],
          '<%= root.build %>/styles/main.css': [
            './bower_components/foundation/css/normalize.css',
            '<%= root.build %>/styles/main.css'
          ],
          '<%= root.build %>/styles/auth.css': [
            './bower_components/foundation/css/normalize.css',
            './bower_components/foundation/css/foundation.css',
            '<%= root.build %>/styles/auth.css'
          ]
        }
      }
    },

    /**
     * Simlink task, used for development
     * @type {Object}
     */
    symlink: {
      options: {
        overwrite: true
      },
      scripts: {
        src: '<%= root.app %>/scripts',
        dest: '<%= root.build %>/scripts'
      },
      // images: {
      //   src: '<%= root.app %>/images',
      //   dest: '<%= root.build %>/images'
      // }
    },

    /**
     * Watch task
     * @type {Object}
     */
    watch: {
      options: {
        spawn: false,
      },
      scripts: {
        files: '<%= jshint.files %>',
        tasks: ['jshint'],
      },
      styles: {
        files: '<%= root.build %>/styles/**/*.styl %>',
        tasks: ['stylus'],
      }
    }

  });

  /**
   * Grunt test task
   */
  grunt.registerTask('test', [
    'jshint'
  ]);

  /**
   * Grunt default task
   */
  grunt.registerTask('default', [
    'test',
    'clean',
    'stylus',
    'symlink',
    'watch'
  ]);

  /**
   * Grunt build task
   */
  grunt.registerTask('build', [
    'test',
    'clean',
    'stylus',
    'cssmin',
    'requirejs'
  ]);

};
