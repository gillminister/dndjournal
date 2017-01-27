var express           = require('express'),
    path              = require('path'),
    favicon           = require('serve-favicon'),
    logger            = require('morgan'),
    cookieParser      = require('cookie-parser'),
    bodyParser        = require('body-parser'),
    sass              = require('node-sass'),
    sassMiddleware    = require('node-sass-middleware'),
    bourbon           = require('node-bourbon');


var routes = require('./routes/index');
var dbAPI = require('./routes/api-db');

var app = express();
var engine = require('express-dot-engine');

// view engine setup
app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'dot');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// adding the sass middleware
app.use(
    sassMiddleware({
        src: __dirname + '/sass',
        dest: __dirname + '/public/stylesheets',
        prefix:  '/stylesheets',
        debug: true
    })
);

// adding compass middleware
/*app.use(
  compassMiddleware({
    css: path.join(__dirname, 'public/stylesheets'),
    sass: path.join(__dirname, 'sass'),
    project: path.join(__dirname, 'public')
  })
);*/


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

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/', dbAPI);

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


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
        .json({
            status: 'error',
            message: err.message
        });
});


module.exports = app;
