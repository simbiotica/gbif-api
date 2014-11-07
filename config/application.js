var express = require('express');
var path = require('path');
var logger = require('morgan');
//var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var secret = require('./secrets').secret;

/**
 * Application configuration
 * @param  {Object} app  Express application instance
 */
module.exports = function(app) {

  'use strict';

  /**
   * Set title
   */
  app.set('title', 'CervezasYa');

  /**
   * Set template engine
   */
  app.set('views', path.join(__dirname, '../', 'app', 'views'));
  app.set('view engine', 'jade');

  /**
   * Application settings
   */
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  // app.use(session({
  //   //secret: secret,
  //   cookie: {
  //     maxAge: 60000
  //   },
  //   saveUninitialized: true,
  //   resave: true
  // }));

  /**
   * Public folder
   */
  app.use(express.static(path.join(__dirname, '../', 'public')));
  app.use('/bower_components',  express.static(path.join(__dirname, '../', 'bower_components')));

  /**
   * Development environment
   */
  // if (app.get('env') === 'development') {}

};
