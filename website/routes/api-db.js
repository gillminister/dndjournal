var express = require('express');
var router = express.Router();

var db = require('../queries/character-queries');

router.get('/characters', db.getAllCharacters);
router.get('/characters/:id', db.getSingleCharacter);
router.post('/api/characters', db.createCharacter);
router.put('/api/characters/:id', db.updateCharacter);
router.delete('/api/characters/:id', db.removeCharacter);



module.exports = router;
