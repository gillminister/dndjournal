var express = require('express');
var router = express.Router();


var path = require('path');



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {fromServer: 'Hei, Jørn!'});
});

router.get('/layout', function (req, res) {
    res.render('layout/index');
});

router.get('/cascade', function(req, res) {
    res.render('cascade/me');
});

router.get('/partial', function(req, res) {
    res.render('partial/index');
});

module.exports = router;
