"use strict";

var express = require('express'),
    winston = require('winston'),
    mongoose = require('mongoose'),
    config = require('config'),
    cors = require('cors'),
    passport = require('passport'),
    LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    multer  = require('multer');
    //upload = multer({ dest: 'public/uploads/' });

    var storage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, './public/uploads/');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, file.originalname)
        }
    });
    var upload = multer({ storage: storage });
    var routes = require('./routes');



var dbConfig = config.get('database');

mongoose.connect(dbConfig.get('path') + dbConfig.get('name'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('yay!');
});

require('./models/users.model.js');
require('./models/projects.model.js');
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
        console.log(err);
    })
});
app.post('/user', (req, res)=>{

    userCtrl.setUser(req.body.user)
        .then(function(user){
            res.json({status:'ok', payload:user});
        }).catch(function(err){

        })
});
app.put('/user', (req, res)=>{

    userCtrl.updateUser(req.body.user)
    .then(function(user){
        res.json({status:'ok', payload:user});
    }).catch(function(err){
        console.log(err);
    })
});

app.post('/project/:userId', (req, res)=>{

    userCtrl.setProject(req.params.userId, req.body.project)
        .then(function(project){
            res.json({status:'ok', payload:project});
        }).catch(function(err){
            console.log(err);
        })
});

app.post('/profile', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    if (!req.file){ //work around file was not moved
        let file = req.files[0];
        let oldPath  = file.path;
        let newPath = './public/uploads';
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
            console.log('Successfully renamed - AKA moved!')
        })
    }else{
        res.json({status:'ok', payload:'uploads/'+req.file.filename});
    }

});

app.post('/scan/upload', (req, res)=>{

    let user = {};
    let facebookData = req.body.facebookData;
    facebookData.about ? user.about = facebookData.about : user.about = undefined;
    facebookData.phone ? user.phone = facebookData.phone : user.phone = undefined;
    user.role = 'user';
    facebookData.description ? user.description = facebookData.description: user.description = undefined;
    facebookData.emails[0] ? user.email = facebookData.emails[0]: user.email = undefined;
    facebookData.contact_address ? user.address = facebookData.contact_address : user.address = undefined;
    facebookData.website ? user.website = facebookData.website: user.website = undefined;
    user.company = facebookData.company;
    user.firstName =  facebookData.firstName;
    user.lastName =  facebookData.lastName;
    user.profession = facebookData.profession;

    userCtrl.setUser(user)
    .then(function(user){
        res.json({status:'ok', payload:user});
    }).catch(function(err){

    })

});

app.post('/auth/facebook/callback', (req, res)=>{

})

app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/main');
});

app.listen(4000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
//var graph = require('fbgraph');
//var authUrl = graph.getOauthUrl({
//    "client_id":     '107630506476024'
//    , "redirect_uri":  'http://localhost:4000/auth/facebook/callback'
//});
//res.redirect(authUrl);
