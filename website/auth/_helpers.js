const bcrypt = require('bcryptjs');
const db = require('../db/connection');
const passport = require('./local');


function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req, res, next) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  db.any("insert into userbase (email, username, password, salt)" +
      "values(${email}, ${username}, '" + hash + "', '" + salt +"')", req.body)
      .then((response) => {
        passport.authenticate('local', (err, user, info) => {
          if (user) { handleResponse(res, 200, 'success'); }
        })(req, res, next);
      })
      .catch((err) => { handleResponse(res, 500, 'error'); });
}

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}



module.exports = {
  comparePass,
  createUser
};
