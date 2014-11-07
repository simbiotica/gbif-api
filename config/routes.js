var express = require('express');
var apiRouter = express.Router();

/**
 * Application Router
 * @param  {Object} app  Express application instance
 */
module.exports = function(app) {

  'use strict';

  var appController = require('../app/controllers/app_controller');
  var citizensController = require('../app/controllers/api/v1/citizens_controller');

  /**
   * API
   */
  apiRouter.route('/citizens')
    .get(citizensController.getCitizensByCountry);

  apiRouter.route('/total')
    .get(citizensController.getTotal);

  /**
   * Router
   */
  app.use('/api/', apiRouter);
  app.get('/', appController.index);

};
