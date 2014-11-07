var express = require('express');
var app = express();

require('../config/application')(app);
require('../config/routes')(app);

module.exports = app;
