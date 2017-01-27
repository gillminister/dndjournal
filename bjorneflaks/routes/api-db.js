var express = require('express');
var router = express.Router();


var path = require('path');


var charDB = require('../queries/character-queries');
var eventDB = require('../queries/event-queries');

router.get('/characters', charDB.getAllCharacters);
router.get('/characters/:id', charDB.getSingleCharacter);
router.get('/characters/:id', charDB.getSingleCharacter);


router.get('/events', eventDB.getAllEvents);

module.exports = router;
