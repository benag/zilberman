
/**
 * Module dependencies.
 */

var express = require('express'),
    winston = require('winston'),
    mongoose = require('mongoose'),
    config = require('config'),
    cors = require('cors'),
    passport = require('passport'),
    LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy
    routes = require('./routes');



var dbConfig = config.get('database');
winston.add(winston.transports.File, {
  filename: 'public/logs/bulldog.log',
  handleExceptions: true,
  humanReadableUnhandledException: true
});

//require('models/users.model.js');
//var User = mongoose.model('User');

//let strategy = new Auth0Strategy({
//    domain:       'ganim.auth0.com',
//    clientID:     'wrHwIUz1KJE9NxE86oiyB7cE9zqSanO2',
//    clientSecret: 'fz6Pjvn6NY7qtdqicQBizJ3fQkHPbxhlYaQbhMt6XqXIjv38eTYjQqxJ4vB3wCi_',
//    callbackURL:  'http://localhost:4000/callback'
//}, function(accessToken, refreshToken, extraParams, profile, done) {
//    // profile has all the information from the user
//    return done(null, profile);
//});

//passport.use(strategy);
//
//passport.serializeUser(function(user, done) {
//    done(null, user);
//});
//
//passport.deserializeUser(function(user, done) {
//    done(null, user);
//});


mongoose.connect(dbConfig.get('path') + dbConfig.get('name'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('yay!');
});
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(cors());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(passport.initialize());
  app.use(passport.session());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/main');
});

app.listen(4000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
