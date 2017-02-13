var express             = require('express'),
    path                = require('path'),
    favicon             = require('serve-favicon'),
    logger              = require('morgan'),
    cookieParser        = require('cookie-parser'),
    bodyParser          = require('body-parser'),
    sass                = require('node-sass'),
    sassMiddleware      = require('node-sass-middleware'),
    bourbon             = require('node-bourbon'),
    multer              = require('multer'),
    flash               = require('connect-flash'),
    session             = require('express-session'),
    passport            = require('passport'),
    LocalStrategy       = require('passport-local').Strategy,
    RedisStore          = require('connect-redis')(session);


var routes = require('./routes/index');
var users = require('./routes/users');
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
    // store: new RedisStore({
    //   url: config.redisStore.url
    // }),
    secret: 'Rpulr2PhclcBNXzdTjoFR8v+F02Qixutq2wEecwbtIs2ojnKp5F21OREa0eEc344o1XVmFP8y/0PwlSSJqOxAg==',
    // secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session


var dbdb = require('./queries/userbase-queries');


// // passport config
passport.use(new LocalStrategy(
	{usernameField: 'email'},
	(email, password, done) => {
		dbdb.findByEmail(email, function(err, user) {
		console.log("checking for user: " + user);
		if (err) { return done(err); }
		if (!user) { return done(null, false); }
		if (user.password != password) { return done(null, false); }
		return done(null, user);
	});
}));


passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  dbdb.findByEmail(email, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});


app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });




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
                status: 'error_dev',
                message: err.stack
            });
    });
}



app.use(function (err, req, res, next) {
  console.error(err.stack)
  // res.status(500).send(err.message)
	app.use(function (err, req, res, next) {
			res.status(err.code || 500)
					.json({
							status: 'errorqqq',
							message: err
					});
	});
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
