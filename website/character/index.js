var express = require('express');
var router = express.Router();

var db = require('./queries');


router.get('/api/characters', db.getAllCharacters);
// router.get('/api/characters/:id', db.getSingleCharacter);
// router.post('/api/characters', db.createCharacter);
// router.put('/api/characters/:id', db.updateCharacter);
// router.delete('/api/characters/:id', db.removeCharacter);


module.exports = router;


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
