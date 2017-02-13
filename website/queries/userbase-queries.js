// get db connection
var db = require('./database-connection').db;


// add query functions

// module.exports = {
//   getAllCharacters: getAllCharacters,
//   getSingleCharacter: getSingleCharacter,
//   createCharacter: createCharacter,
//   updateCharacter: updateCharacter,
//   removeCharacter: removeCharacter,
// };


var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', email: 'jorn91@gmail.com' }
  , { id: 2, username: 'jill', password: 'b', displayName: 'Jill', email: 'jill@example.com' }
];

// exports.findById = function(id, cb) {
// 	console.log(id);
//   process.nextTick(function() {
// 		for (var i = 0, len = records.length; i < len; i++) {
//       var record = records[i];
//       if (record.email == id) {
//         return cb(null, record);
//       }
//     }
//     cb(new Error('User ' + id + ' does not exist'));
//   });
// }

exports.findByEmail = function(email, cb) {
	console.log("starting log in attempt: " + email)
	db.one("select * from userbase where email =$1", email)
		.then((user) => {
			console.log("result: "+user.username);
			if(user.email)
				return cb(null, user);
			else
				return cb(null, null);
		})
		.catch((err) => {console.log(err)});
	// console.log(qqqq);
  // process.nextTick(function() {
	// 	console.log(email);
  //   for (var i = 0, len = records.length; i < len; i++) {
  //     var record = records[i];
	// 		console.log("\t"+record.email);
  //     if (record.email == email) {
	// 			console.log("\t\tmatch found: "+record)
  //       return cb(null, record);
  //     }
  //   }
  //   return cb(null, null);
  // });
}
