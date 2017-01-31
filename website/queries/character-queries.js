var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://dndjournal:furrybananas@localhost:5432/dndjournal';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllCharacters: getAllCharacters,
  getSingleCharacter: getSingleCharacter,
  createCharacter: createCharacter,
  updateCharacter: updateCharacter,
  removeCharacter: removeCharacter,
};


function getAllCharacters(req, res, next) {
  db.any('select * from character order by name')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL characters ordered by name'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getSingleCharacter(req, res, next) {
  var characterID = parseInt(req.params.id);
  db.one('select * from character where id = $1', characterID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE character'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createCharacter(req, res, next) {
  // var obj = {};
	// console.log('body: ' + JSON.stringify(req.body));
	// res.send("bollocks2");
	console.log(req.body.name)
	console.log(req.body.race)
  // res.status(200)
  //   .json({
  //     status: 'success',
  //     message: 'Inserted one character'
  //   });
  db.none("insert into character (name, race)" +
      "values(${name}, ${race})", req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one character'
        });
    })
    .catch(function (err) {
      err.message = "Something broke at DB level while trying to insert Character\n\n" + err.message;
      return next(err);
    });

}

function updateCharacter(req, res, next) {
  db.none('update character set name=$1, race=$2, class=$3 where id=$5',
    [req.body.name, req.body.race, req.body.class, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated character'
        });
    })
    .catch(function (err) {
      return next(err);
    });

}

function removeCharacter(req, res, next) {
  var characterID = parseInt(req.params.id);
  db.result('delete from character where id = $1', characterID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} character`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
