
/**
 * Module dependencies.
 */

var express = require('express'),
    models = require('./models/user'),
    winston = require('winston'),
    mongoose = require('mongoose'),
    config = require('config')
  , routes = require('./routes');


var dbConfig = config.get('database');
winston.add(winston.transports.File, {
  filename: 'public/logs/bulldog.log',
  handleExceptions: true,
  humanReadableUnhandledException: true
});
mongoose.connect(dbConfig.get('path') + dbConfig.get('name'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('yay!');
});
var app = module.exports = express.createServer();
models.initUser(app);
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
