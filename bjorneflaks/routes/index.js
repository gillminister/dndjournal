var express = require('express');
var router = express.Router();


var path = require('path');


var db = require('../queries');

var engine = require('../');

router.get('/api/characters', db.getAllCharacters);
router.get('/api/characters/:id', db.getSingleCharacter);
router.get('/api/events', db.getAllEvents);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
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

router.get('/helper', function(req, res) {


    // helper as a property
    engine.helper.myHelperProperty = 'Hello from server property helper';

    // helper as a method
    engine.helper.myHelperMethod = function(param) {
        return 'Hello from server method helper (parameter: ' + param + ', server model: ' + this.model.fromServer + ')';
    };

    res.render('helper/index', { fromServer: 'Hello from server', });
});

module.exports = router;
