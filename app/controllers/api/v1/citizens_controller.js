'use strict';

var citizen = require('../../../models/citizen');

module.exports = {

  getCitizensByCountry: function(req, res) {
    citizen.getByCountry(res);
  },
  getTotal: function(req, res) {
    citizen.getTotal(res);
  },

};
