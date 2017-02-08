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
  getRaceEnums: getRaceEnums,
};


function getRaceEnums(req, res, next) {
  db.any('SELECT enum_range(NULL::race)')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved enum options for Race'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
