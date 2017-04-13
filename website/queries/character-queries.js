// get db connection
var db = require('./database-connection').db;


// add query functions

module.exports = {
    getAllCharacters: getAllCharacters,
    getSingleCharacter: getSingleCharacter,
    createCharacter: createCharacter,
    updateCharacter: updateCharacter,
    removeCharacter: removeCharacter,
};


function getAllCharacters(req, res, next) {
    console.log(db.any('select * from character order by name')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                });
        })
        .catch(function(err) {
            return next(err);
        }));
}


function getSingleCharacter(req, res, next) {
    var characterID = parseInt(req.params.id);
    db.one('select * from character where id = $1', characterID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE character'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function createCharacter(req, res, next) {

    var attributesToUpdate = "";
    var attributesStringStructure = "";
    Object.keys(req.body).forEach(
        function(key) {
            attributesToUpdate += key + ", ";
            attributesStringStructure += "${" + key + "}, ";
        });
    attributesToUpdate = attributesToUpdate.substring(0, attributesToUpdate.length - 2);
    attributesStringStructure = attributesStringStructure.substring(0, attributesStringStructure.length - 2);

    console.log("\t\tinsert into character (" + attributesToUpdate + ") values (" + attributesStringStructure + ")");

    db.none(("insert into character (" + attributesToUpdate + ") values (" + attributesStringStructure + ")"), req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one character'
                });
        })
        .catch(function(err) {
            err.message = "Something broke at DB level while trying to insert Character\n\n" + err.message;
            return next(err);
        });
}

function updateCharacter(req, res, next) {
    // create list of attributes to update, based on http put
    var attributesToUpdate = "";
    Object.keys(req.body).forEach(
        function(key) {
            attributesToUpdate += key + "=${" + key + "},"
        });
    attributesToUpdate = attributesToUpdate.substring(0, attributesToUpdate.length - 1);

    // get provided id
    var characterID = parseInt(req.params.id);

    // update character
    db.none(("update character set " + attributesToUpdate + " where id = " + characterID), req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated character ' + req.body.name
                });
        })
        .catch(function(err) {
            err.message = "Something broke at DB level while trying to update Character\n\n" + err.message;
            return next(err);
        });
}

function removeCharacter(req, res, next) {
    var characterID = parseInt(req.params.id);
    db.result('delete from character where id = $1', characterID)
        .then(function(result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} character`
                });
            /* jshint ignore:end */
        })
        .catch(function(err) {
            return next(err);
        });
}
