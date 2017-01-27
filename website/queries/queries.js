var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://dndjournal:Teik5ait@localhost:5432/dndjournal';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllCharacters: getAllCharacters,
  // getSingleCharacter: getSingleCharacter,
  // createCharacter: createCharacter,
  // updateCharacter: updateCharacter,
  // removeCharacter: removeCharacter
};


function getAllCharacters(req, res, next) {
  db.any('select * from character')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL characters'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
