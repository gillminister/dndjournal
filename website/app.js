var express           = require('express'),
    path              = require('path'),
    favicon           = require('serve-favicon'),
    logger            = require('morgan'),
    cookieParser      = require('cookie-parser'),
    bodyParser        = require('body-parser'),
    sass              = require('node-sass'),
    sassMiddleware    = require('node-sass-middleware'),
    bourbon           = require('node-bourbon'),
    multer            = require('multer'),
    flash             = require('connect-flash'),
    session           = require('express-session'),
    passport          = require('passport'),
    memoryStore       = require('session-memory-store')(session);;


var routes = require('./routes/index');
var dbAPI = require('./routes/api-db');





var app = express();
var engine = require('express-dot-engine');

// view engine setup
app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'dot');

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

app.use(cookieParser());


// session and passport
app.use(session({
  name: 'JSESSION',
  secret: 'BøgeRedetKatolskeKirkeAuschwitz',
  store: new memoryStore({expires: 86400})
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// adding the sass middleware
app.use(
    sassMiddleware({
        src: __dirname + '/sass',
        dest: __dirname + '/public/stylesheets',
        prefix:  '/stylesheets',
        debug: true
    })
);

// include bourbon with sass
sass.render({
  file: './application.scss',
  success: function(css){
    console.log(css);
  },
  error: function(error) {
    console.log(error);
  },
  // includePaths: bourbon.with('other/path', 'another/path'),
  // - or -
  includePaths: bourbon.includePaths,
  outputStyle: 'compressed'
});



app.use('/', routes);
app.use('/api/', dbAPI);

var durrdb = require('./queries/character-queries');

app.post('/api/characters', durrdb.createCharacter);
app.delete('/api/characters/:id', durrdb.removeCharacter);
app.put('/api/characters/:id', durrdb.updateCharacter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.code || 500)
            .json({
                status: 'error',
                message: err
            });
    });
}



app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.message)
})


// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500)
//         .json({
//             status: 'error',
//             message: err.message
//         });
// });


module.exports = app;
