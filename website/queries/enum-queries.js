// get db connection
var db = require('./database-connection').db;


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
