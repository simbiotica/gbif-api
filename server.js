'use strict';

var debug = require('debug')('openspacescity');
var app = require('./app');
//var config = require('./config/database');
var server;

/**
 * Init mongoose server
 */
//mongoose.connect('mongodb://' + config.hostname + '/' + config.database);

/**
 * Set application port
 */
app.set('port', process.env.PORT || 3000);

/**
 * Create and init Express server
 */
server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

/**
 * Start routines
 */
require('./routine')(app);
