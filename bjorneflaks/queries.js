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
  getSingleCharacter: getSingleCharacter,
  // createCharacter: createCharacter,
  // updateCharacter: updateCharacter,
  // removeCharacter: removeCharacter,
  getAllEvents: getAllEvents
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








function getAllEvents(req, res, next) {
  db.any('select * from event')
    .then(function (data) {
      console.log(data);
      res.render('events', { title: 'Events', events:data });
        // .json({
        //   status: 'success',
        //   data: data,
        //   message: 'Retrieved ALL events'
        // });
    });
}
