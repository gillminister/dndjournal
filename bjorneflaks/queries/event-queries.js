var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://dndjournal:furrybananas@localhost:5432/dndjournal';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllEvents: getAllEvents
};





function getAllEvents(req, res, next) {
    db.any('select * from event')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL events'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


// function getAllEvents(req, res, next) {
//     db.any('select * from event')
//         .then(function (data) {
//             console.log(data);
//             res.render('events', { title: 'Events', events:data });
//             // .json({
//             //   status: 'success',
//             //   data: data,
//             //   message: 'Retrieved ALL events'
//             // });
//         });
// }
