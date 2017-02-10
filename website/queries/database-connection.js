var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://westplate:furrybananas@localhost:5432/westplate';
var db = pgp(connectionString);

// add query functions

module.exports = {
  pgp, db
};
