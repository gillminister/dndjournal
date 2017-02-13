// get db connection
var db = require('./database-connection').db;


// add query functions

module.exports = {
  checkUser: checkUser
};


function checkUser(email, password) {
  var userExists = db.one('select * from userbase where email=' + email + ' AND password=' + password)
    .then(function (data) {
      return true;
    })
    .catch(function (err) {
      return false;
    });

  return userExists;
}
