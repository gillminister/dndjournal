const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');

const options = {};

passport.use(new LocalStrategy(options, function()(username, password, done){
  // check to see if the username exists
  return require('../queries/user-queries').checkUser(username, password);
}));

module.exports = passport;
