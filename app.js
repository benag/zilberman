//"use strict";

var express = require('express'),
    winston = require('winston'),
    mongoose = require('mongoose'),
    config = require('config'),
    cors = require('cors'),
    passport = require('passport'),
    LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    multer  = require('multer'),
    upload = multer({ dest: 'public/uploads/' }),

    routes = require('./routes');



var dbConfig = config.get('database');

mongoose.connect(dbConfig.get('path') + dbConfig.get('name'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('yay!');
});

require('./models/users.model.js');
var userCtrl = require('./controllers/userController.js');

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

app.get('/users/:page/:limit', function(req, res){

    userCtrl.getUsers(req.params.page, req.params.limit)
    .then(function(users){
        res.json({status:'ok', payload:users});
    }).catch((err)=>{

    })
});
app.post('/user', (req, res)=>{

    userCtrl.setUser(req.body.user)
        .then(function(user){
            res.json({status:'ok', payload:user});
        }).catch(function(err){

        })
});

app.post('/project/:userId', (req, res)=>{

    userCtrl.setProject(req,params.userId, req.body.project)
        .then(function(project){
            res.json({status:'ok', payload:project});
        }).catch(function(err){

        })
});

app.post('/profile', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.json({status:'ok', payload:'uploads/'+req.file.filename});
});


app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/main');
});

app.listen(4000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
