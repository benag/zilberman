"use strict";

var express = require('express'),
    winston = require('winston'),
    mongoose = require('mongoose'),
    config = require('config'),
    cors = require('cors'),
    fs = require('fs'),
    logger = require('winston'),
    nexmo = require('./services/nexmo'),
    newEntry = require('./services/newEntry'),
    multer  = require('multer');




    var storage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, '.\\public\\uploads\\');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, file.originalname + Date.now())
        }
    });

var upload = multer({ storage: storage });

require('./models/users.model.js');
const passportService = require('./config/passport');
const passport = require('passport');



//mssql://username:password@localhost/database
//const sql = require('mssql');
//console.log('outside');
//const dbconfig = {
//    user: 'lead_server',
//    password: 'jo98^Hu%',
//    server: '62.219.187.1', // You can use 'localhost\\instance' to connect to named instance
//    port: 3306,
//    database: 'ZIL_LEADS'
//
//};
//var connect = async function () {
//    //try {
//    //    let pool = await sql.connect(dbconfig);
//    //    let result1 = await pool.request()
//    //        .query('select * from LeadsClient');
//    //
//    //    console.log(result1)
//    //
//    //    } catch (err) {
//    //        console.log(err);
//    //    // ... error checks
//    //}
//};
//connect();

//sql.on('error', err => {
//    console.log(err);// ... error handler
//});


var app = module.exports = express.createServer();

const userCtrl = require('./controllers/userController.js');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Configuration

var routes = require('./routes');


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(cors());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(multer());
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

//let mainRouter = require('./routes/mainRouter.js');
//mainRouter.init(app);

app.get('/', routes.index);


app.post('/register', (req, res, next) => {
    //let mng = new userCtrl();
    try{
        userCtrl.register(req, res, next);
    }catch(err){
        console.log(err);
    }

});

// Login route
//requireLogin
app.post('/login', requireLogin, (req, res, next) => {
    //let mng = new userCtrl();
    userCtrl.login(req, res, next);
});

app.post('/verify', requireAuth, (req, res) => {
    res.json('OK');
})

app.get('/sms', (req, res) => {
    nexmo.sms('972526749884', 'test').then( response => {console.log(response); res.send('sent')})
        .catch(err => res.status(400).send('Error sending sms'));
});

app.get('/users/:page/:limit', function(req, res){

    userCtrl.getUsers( req.params.page, req.params.limit )
    .then(function(users){
        res.json({status:'ok', payload:users});
    }).catch((err)=>{
        console.log(err);
    })
});

app.get('/user/phone/:phone', async (req, res) => {
    try{
        let user = await userCtrl.getUserByPhone(req.params.phone);
        res.json(user);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

app.get('/user/:by/:filter/:multiple', async (req,res) => {

    try{
        let users = await userCtrl.getUsersByFilter( req.params.by, req.params.filter, req.params.multiple );
        return res.json(users);
    }catch(err){
        res.status(400).send(err.message);
    }

});

app.post('/user', (req, res)=>{

    userCtrl.setUser(req.body.user)
    .then(function(user){
        res.json({status:'ok', payload:user});
    }).catch(function(err){

    })
});

app.post('/user/activate', async (req, res) => {
    try{

        let user = await userCtrl.activate(req.body.id, req.body.activate);
        return res.json(user);
    }catch(err){
        return res.status(400).send(err.message);
    }
});

app.put('/user', (req, res)=>{

    userCtrl.updateUser(req.body.user)
    .then(function(user){
        res.json({status:'ok', payload:user});
    }).catch(function(err){
        console.log(err);
    })
});

app.delete('/user/:id', (req, res)=>{

    userCtrl.deleteUser(req.params.id)
        .then(function(user){
            res.json({status:'ok', payload:user});
        }).catch(function(err){
            console.log(err);
        })
});

app.post('/cardoc/:id', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.params.id);
    if (!req.file){ //work around file was not moved
        let file = req.files.file;
        let oldPath  = file.path;
        let name 
        "C:\\projects\\dashboard\\public\\uploads"+ "\\" + 
        let newPath = '.\\public\\uploads\\' + oldPath.split('\\').pop();
        let returnPath  = newPath.split('\\').slice(2).join('\\');
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            res.json({status:'ok', payload:returnPath});
        })
    }else{
        res.json({status:'ok', payload:'uploads/'+req.file.filename});
    }

});
app.get('/clients', async function(req, res){
    try{
        let result = await newEntry.getClients();
        res.json(result);
    }catch(err){
        res.status(400);
    }
});
app.get('/products', async function(req, res){
    try{
        let result = await newEntry.getProducts();
        res.json(result);
    }catch(err){
        res.status(400);
    }
});

app.get('/product/:id', async (req, res) => {
    try{
        let result = await newEntry.getProductFull(req.params.id);
        res.json(result);
    }catch(err){
        res.status(400);
    }
});
app.post('/save', async function(req, res) {
    try{
        let result = await newEntry.save(req.body.form, req.body.new);
        res.json(result);
    }catch(err){
        res.status(400);

    }

});

app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/main');
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

