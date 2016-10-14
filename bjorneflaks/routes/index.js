var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/characters', db.getAllCharacters);
router.get('/api/characters/:id', db.getSingleCharacter);
router.get('/api/events', db.getAllEvents);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
