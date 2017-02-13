// get db connection
var db = require('./database-connection').db;


// add query functions

module.exports = {
  findByEmail: findByEmail
};




function findByEmail(email, done) {
	// console.log("starting log in attempt: " + email)
	db.one("select * from userbase where email =$1", email)
		.then((user) => {
			// console.log("result: "+user.username);
			if(user.email)
				return done(null, user);
			else
				return done(null, null);
		})
		.catch((err) => {console.log(err); return done(null, null);});
}
