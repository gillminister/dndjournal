var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* GET character page. */
router.get('/character/', function (req, res, next) {
    res.render('character');
});


module.exports = router;
