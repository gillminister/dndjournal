var express = require('express');
var router = express.Router();
var app = express();

var charDB = require('../queries/character-queries');
var enumDB = require('../queries/enum-queries');

router.get('/characters', charDB.getAllCharacters);
router.get('/characters/:id', charDB.getSingleCharacter);
router.get('/enum/race', enumDB.getRaceEnums);
// app.post('/api/characters', db.createCharacter);
// router.put('/api/characters/:id', db.updateCharacter);
// router.delete('/api/characters/:id', db.removeCharacter);



module.exports = router;
