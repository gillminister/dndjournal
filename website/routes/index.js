var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // req.session.user = "bendik";
  res.render('index', { user: req.user, });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login');
});

/* GET profile page. */
router.get('/profile', function (req, res, next) {
  res.render('profile', { user: req.user });
});

/* GET character page. */
router.get('/character/', function (req, res, next) {
    res.render('character');
});


// router.get('/bab', function(req, res){
//    if(req.session.tull){
//       req.session.tull++;
//       res.send("You visited this page " + req.session.tull + " times" + req.session.page_views);
//    }else{
//       req.session.tull = 1;
//       res.send("Welcome to this page for the first time!");
//    }
// });


module.exports = router;
