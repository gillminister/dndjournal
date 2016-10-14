var express = require('express');
var router = express.Router();

var db = require('../character/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/characters', db.getAllCharacters);
router.get('/api/characters/:id', db.getSingleCharacter);
// router.post('/api/characters', db.createCharacter);
// router.put('/api/characters/:id', db.updateCharacter);
// router.delete('/api/characters/:id', db.removeCharacter);

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
  var pupID = parseInt(req.params.id);
  db.one('select * from character where id = $1', pupID)
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



module.exports = router;
