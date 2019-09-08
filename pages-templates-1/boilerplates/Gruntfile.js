/*
This file is intended for boilerplate generations of pages
Not intended to be modified and used.
*/
'use strict';

module.exports = function(grunt) { 
var config = {
    appex: 'my-express-app',
    appSails: 'my-sails-app',
    appRails: 'rails-app',
};

grunt.loadNpmTasks('grunt-exec');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-string-replace');
grunt.loadNpmTasks('grunt-file-append');

grunt.initConfig({ config: config, pkg: grunt.file.readJSON('package.json'),

exec: {
  express: {
    cmd: function() {
      if(config.appex == null){
          config.appex='my-express-app';
      }
      return 'express ' + config.appex+' -H -c less';
    }
  },
  sails:{
    cmd: function() {
      if(config.appSails == null){
          config.appSails='my-sails-app';
      }
      return 'sails new '+config.appSails;
    }
  },
  rails:{
    cmd: function() {
      if(config.appRails == null){
          config.appRails='rails-app';
      }
      return 'rails new '+config.appRails;
    }
  }
},
'string-replace': {
  dist: {
    files: [{
      expand: true,
      cwd:'<%= config.appRails %>/config/',
      src: 'application.rb',
      dest:'<%= config.appRails %>/config/'
    }],
    options: {
      replacements: [{
        pattern: 'class Application < Rails::Application',
        replacement: 'class Application < Rails::Application \n config.assets.paths << File.join(Rails.root, "/vendor/pages")'
      }]
    }
  }
},
'file_append': {
  default_options: {
    files: [
      {
        append: "# Gems for twitter LESS -> CSS and JS support \n gem 'execjs' \n gem 'therubyracer' \n gem 'less-rails', '~> 2.7.1'",
        input:'<%= config.appRails %>/Gemfile',
        output:'<%= config.appRails %>/Gemfile'
      }
    ]
  }
},
copy: {
  rails:{
      files: [{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/pages',
          dest: '../boilerplates/<%= config.appRails %>/vendor/pages/pages-core'
      },{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/assets/plugins',
          dest: '../boilerplates/<%= config.appRails %>/vendor/pages/pages-plugins'
      },{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/assets/img',
          dest:'<%= config.appRails %>/app/assets/images'
      },{
          src: ['**/*'],
          expand: true,
          cwd: 'bin/rails/views/',
          dest:'<%= config.appRails %>/app/views/layouts'
      },
      {
          src: ['**/*'],
          expand: true,
          cwd: 'bin/rails/stylesheets/',
          dest:'<%= config.appRails %>/app/assets/stylesheets'
      },{
          src: ['**/*'],
          expand: true,
          cwd: 'bin/rails/javascripts/',
          dest:'<%= config.appRails %>/app/assets/javascripts'
      },]
  },
  express:{
      files: [{
          src: ['pages/**/*'],
          expand: true,
          cwd: '../getting_started/html/',
          dest: '../boilerplates/<%= config.appex %>/public/'
      },{
          src: ['plugins/**/*'],
          expand: true,
          cwd: '../getting_started/html/assets/',
          dest: '../boilerplates/<%= config.appex %>/public/'
      },{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/assets/img',
          dest: '../boilerplates/<%= config.appex %>/public/images'
      },{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/assets/js',
          dest: '../boilerplates/<%= config.appex %>/public/javascripts'
      },{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/assets/less/',
          dest: '../boilerplates/<%= config.appex %>/public/stylesheets'
      },
      {
        src: ['**/*'],
        expand: true,
        cwd: 'bin/expressjs/views/',
        dest: '../boilerplates/<%= config.appex %>/views/'
      }]
  },
  sails:{
      files: [{
          src: ['plugins/**/*.min.css','plugins/jquery-scrollbar/jquery.scrollbar.css','plugins/font-awesome/fonts/**',
          'plugins/pace/pace-theme-flash.css',
          '!plugins/jquery-datatable/extensions/**/*',
          '!plugins/jquery-ui/**/*',
          '!plugins/ion-slider/**/*',
          '!plugins/nvd3/**/*',
          '!plugins/rickshaw/**/*',
          '!plugins/xcharts/**/*',
          '!plugins/bootsrapv3/css/bootstrap-theme.min.css'],
          expand: true,
          cwd: '../getting_started/html/assets/',
          dest: '../boilerplates/<%= config.appSails %>/assets/styles/'
      },{
          src: ['plugins/**/*.min.js','plugins/modernizr.custom.js','!plugins/jquery-validation/js/localization/*.js','!plugins/jquery-datatable/extensions/**/*',
          '!plugins/jquery-lookingfor/**/*',
          '!plugins/jquery-sparkline/**/*',
          '!plugins/nvd3/**/*',
          '!plugins/responsive-tabs/**/*',
          '!plugins/rickshaw/**/*',
          '!plugins/xcharts/**/*',
          '!plugins/alerts/**/*',
          '!plugins/boostrap-form-wizard/**/*',
          '!plugins/bootstrap-tag/**/*',
          '!plugins/dropzone/**/*',
          '!plugins/imagesloaded/**/*',
          '!plugins/ion-slider//**/*',
          '!plugins/jquery-dynatree/**/*',
          '!plugins/jquery-metrojs/**/*',
          '!plugins/jquery-ui-touch/**/*',
          '!plugins/jquery-ui/**/*',
          '!plugins/moment/**/*',
          '!plugins/noui-slider/**/*',
          '!plugins/owl-carousel/**/*',
          '!plugins/sly/**/*',
          '!plugins/summernote/**/*',
          '!plugins/sly.min.js',
          '!plugins/hammer.min.js',
          '!plugins/jquery-nouislider/**/*',
          '!plugins/d3/**/*',
          '!plugins/jquery-mousewheel/**/*',
          '!plugins/bootstrap3-wysihtml5/**/*',
          '!plugins/datatables-responsive/**/*',
          '!plugins/switchery/**/*',
          '!plugins/jquery-slider/**/*',
          '!plugins/jquery-nestable/**/*',
          '!plugins/jquery.sieve.min.js',
          '!plugins/jquery-validation/js/additional-methods.min.js',
          ],
          expand: true,
          cwd: '../getting_started/html/assets/',
          dest: '../boilerplates/<%= config.appSails %>/assets/js/dependencies/'       
      },{
          src: ['pages.js'],
          expand: true,
          cwd: '../getting_started/html/pages/js',
          dest: '../boilerplates/<%= config.appSails %>/assets/js/'       
      },{
          src: ['pages-icons.css','editor.css','windows.chrome.fix.css'],
          expand: true,
          cwd: '../getting_started/html/pages/css',
          dest: '../boilerplates/<%= config.appSails %>/assets/styles/'        
      },{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/pages/less',
          dest: '../boilerplates/<%= config.appSails %>/assets/styles/'       
      },{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/pages/fonts',
          dest: '../boilerplates/<%= config.appSails %>/assets/fonts/'        
      },{
          src: ['scripts.js'],
          expand: true,
          cwd: '../getting_started/html/assets/js',
          dest: '../boilerplates/<%= config.appSails %>/assets/js/'        
      },{
          src: ['**/*'],
          expand: true,
          cwd: 'bin/sailsjs/views',
          dest: '../boilerplates/<%= config.appSails %>/views/'        
      },{
          src: ['less.js'],
          expand: true,
          cwd: 'bin/sailsjs/tasks',
          dest: '../boilerplates/<%= config.appSails %>/tasks/config'        
      },{
          src: ['pipeline.js'],
          expand: true,
          cwd: 'bin/sailsjs/tasks',
          dest: '../boilerplates/<%= config.appSails %>/tasks/'        
      },{
          src: ['img/**/*'],
          expand: true,
          cwd: '../getting_started/html/assets/',
          dest: '../boilerplates/<%= config.appSails %>/assets/'        
      },{
          src: ['**/*'],
          expand: true,
          cwd: '../getting_started/html/pages/img',
          dest: '../boilerplates/<%= config.appSails %>/assets/img/'        
      },{
          src: ['favicon.ico'],
          expand: true,
          cwd: 'bin/',
          dest: '../boilerplates/<%= config.appSails %>/assets/'        
      }
    ]   
  }
}
});

grunt.registerTask(
  'build:express', 
  'Compiles all of the assets and copies the files to the build directory.',
  function(arg){
    config.appex=arg;
    grunt.task.run('exec:express','copy:express');
  }
);
grunt.registerTask(
  'build:sails', 
  'Compiles all of the assets and copies the files to the build directory.',
  function(arg){
    config.appSails=arg;
    grunt.task.run('exec:sails','copy:sails');
  }
);
grunt.registerTask(
  'build:rails','Compiles all of the assets and copies the files to the build directory.',
  function(arg){
    config.appRails=arg;
    grunt.task.run('exec:rails','copy:rails','file_append','string-replace');
  }
);
};
