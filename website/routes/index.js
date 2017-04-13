var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  // req.session.user = "bendik";
  res.render('index', { user: req.user, });
});

/* GET profile page. */
router.get(
	'/profile',
	require('connect-ensure-login').ensureLoggedIn({ redirectTo: "/" }),
	(req, res, next) => {
	  res.render('profile', { user: req.user });
});

/* GET character page. */
router.get(
	'/characters',
	require('connect-ensure-login').ensureLoggedIn({ redirectTo: "/" }),
	(req, res, next) => {
	  res.render('characters', { user: req.user });
});

/* GET character page. */
router.get(
	'/campaign',
	require('connect-ensure-login').ensureLoggedIn({ redirectTo: "/" }),
	(req, res, next) => {
	  res.render('campaign', { user: req.user });
});


module.exports = router;
