"use strict";

var express = require('express'),
    winston = require('winston'),
    mongoose = require('mongoose'),
    config = require('config'),
    cors = require('cors'),
    fs = require('fs'),
    logger = require('winston'),
    multer  = require('multer');



    var storage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, './public/uploads/');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, file.originalname + Date.now())
        }
    });
    var storageAdmin = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, './public/uploads/users/admin');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, file.originalname + Date.now())
        }
    });

    var projectStorage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, './public/uploads/projects');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, file.originalname)
        }
    });
    var productStorage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, './public/uploads/products');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, file.originalname)
        }
    });
    var excelStorage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, './public/uploads/excel');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, file.originalname)
        }
    });

    var upload = multer({ storage: storage });

    var uploadAdmin = multer({ storage: storageAdmin });

    var projectUpload = multer({ storage: projectStorage});

    var productUpload = multer({ storage: productStorage});

    var excelUpload = multer({ storage: excelStorage});

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
require('./models/products.model.js');
require('./models/rooms.model.js');
require('./models/events.model.js');
require('./models/config.model.js');
require('./models/orders.model.js');
var userCtrl = require('./controllers/userController.js');
var productCtrl = require('./controllers/productsCtrl.js');
var eventCtrl = require('./controllers/eventCtrl.js');
var orderCtrl = require('./controllers/orderCtrl.js');
var settingsService = require('./services/settings.js');
var passportService = require('./config/passport');
const passport = require('passport'),
requireAuth = passport.authenticate('jwt', { session: false }),
requireLogin = passport.authenticate('local', { session: false });

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

let mainRouter = require('./routes/mainRouter.js');
mainRouter.init(app);

app.get('/', routes.index);


app.post('/register', (req, res, next) => {
    //let mng = new userCtrl();
    userCtrl.register(req, res, next);
});

// Login route
//requireLogin
app.post('/login', requireLogin, (req, res, next) => {
    //let mng = new userCtrl();
    userCtrl.login(req, res, next);
})

app.post('/verify', requireAuth, (req, res) => {
    res.json('OK');
})


app.get('/users/:page/:limit', function(req, res){

    userCtrl.getUsers( req.params.page, req.params.limit )
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
app.delete('/user/:id', (req, res)=>{

    userCtrl.deleteUser(req.params.id)
        .then(function(user){
            res.json({status:'ok', payload:user});
        }).catch(function(err){
            console.log(err);
        })
});

app.post('/project/:userId', (req, res)=>{

    userCtrl.setProject(req.params.userId, req.body.project)
    .then(project=>
            res.json({status:'ok', payload:project}))
    .catch(err => console.log(err) );

});

app.put('/project/', (req, res)=>{
    userCtrl.updateProject(req.body.project)
    .then(function(project){
        res.json({status:'ok', payload:project});
    })
    .catch(err => console.log(err) );
});


app.post('/events', (req, res)=>{
    eventCtrl.setEvent(req.body.userId, req.body.start, req.body.end, req.body.roomId, req.body.title )
    .then(function(event){
        res.json({status:'ok', payload:event});
    })
    .catch(err => console.log(err) );
});

app.put('/events/:id', (req, res) => {
    eventCtrl.updateEvent(req.params.id, req.body.userId, req.body.start, req.body.end, req.body.roomId, req.body.title )
        .then(function(event){
            res.json({status:'ok', payload:event});
        })
        .catch(err => console.log(err) );
})
app.delete('/events/:id', (req, res)=>{
    eventCtrl.deleteEvent(req.params.id )
        .then(function(event){
            res.json({status:'ok', payload:event});
        })
        .catch( (err) => {
            console.log(err)
        } );
})


app.get('/events/room/:room', (req, res)=>{
    eventCtrl.getEvents( req.params.room )
    .then(function(event){
        res.json(event);
    })
    .catch(err => console.log(err) );
});

app.get('/events/:id', async (req, res) => {
    try{
        let event = await eventCtrl.getEvent(req.params.id );
        if (event) return res.json({status:'ok', payload:event});
        return res.json({status:false});
    }catch(err){
        consoe.log(err);
    }

});

app.post('/admin-image', uploadAdmin.single('file'), async (req, res, next) => {
    let user = req.body.user;
    let img = 'uploads/users/admin/' + req.file.filename;
    user.img = img;
    await userCtrl.updateUser(user);
    res.send(img);
});

app.post('/profile', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    if (!req.file){ //work around file was not moved
        let file = req.files.file;
        let oldPath  = file.path;
        let newPath = './public/uploads/' + oldPath.split('/').pop();
        let returnPath  = newPath.split('/').slice(2).join('/');
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            res.json({status:'ok', payload:returnPath});

        })
    }else{
        res.json({status:'ok', payload:'uploads/'+req.file.filename});
    }

});

app.post('/projectimage', projectUpload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    if (!req.file){ //work around file was not moved
        let file = req.files.file;
        let oldPath  = file.path;
        let newPath = './public/uploads/projects' + oldPath.split('/').pop();
        let returnPath  = newPath.split('/').slice(2).join('/');
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            res.json({status:'ok', payload:returnPath});

        })
    }else{
        res.json({status:'ok', payload:'uploads/projects/'+req.file.filename});
    }

});

app.post('/product-image', productUpload.single('file'), function (req, res, next) {

    if (!req.file){ //work around file was not moved
        let file = req.files.file;
        let oldPath  = file.path;
        let newPath = './public/uploads/products' + oldPath.split('/').pop();
        let returnPath  = newPath.split('/').slice(2).join('/');
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            res.json({status:'ok', payload:returnPath});
        })
    }else{
        res.json({status:'ok', payload:'uploads/products/'+req.file.filename});
    }

});

app.post('/excel-file', excelUpload.single('file'), function (req, res, next) {

    if (!req.file){ //work around file was not moved
        let file = req.files.file;
        let oldPath  = file.path;
        let newPath = './public/uploads/excel' + oldPath.split('/').pop();
        let returnPath  = newPath.split('/').slice(2).join('/');
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            res.json({status:'ok', payload:returnPath});
        })
    }else{
        let path = __dirname + '/public//uploads/excel/'+req.file.filename;
        //let excel = fs.readFileSync(path);
        settingsService.loadCSV(path);
        res.json({status:'ok', payload:'uploads/excel/'+req.file.filename});
    }

});


app.put('/products',(req, res)=>{
    productCtrl.updateProduct(req.body.product)
    .then((product)=>{
        res.json(product);
    })
});
app.put('/products/product',(req, res)=>{
    productCtrl.addSubProduct(req.body.product, req.body.subProduct)
    .then((product)=>{
        res.json(product);
    })
});
app.get('/products',(req, res)=>{
    productCtrl.getProducts(req.body.product)
    .then((product)=>{
        res.json(product);
    })
});

app.get('/login/:email/:pass',(req, res)=>{
    userCtrl.login(req.params.email,req.params.pass)
    .then((user)=>{
        if(user){
            res.json({status:true, payload:user})
        }else{
            res.json({status:false, payload:''})
        }
    })
});

app.post('/products/delete',(req, res)=>{
    productCtrl.remove(req.body.product)
    .then((product)=>{
        res.json(product);
    })
});


app.post('/products',(req, res)=>{
    productCtrl.createProduct(req.body.product)
    .then((product)=>{
        res.json(product);
    }).catch(function(err){
        console.log(err);
    })
});

app.post('/orders',(req, res)=>{
    userCtrl.substract(req.body.user, req.body.product, req.body.identify )
    .then((product)=>{
        res.json(product);
    }).catch(function(err){
        console.log(err);
    })
});

app.post('/order/process',  async (req, res) => {
    let order = orderCtrl.processOrder(req.body.orders, req.body.user, req.body.total);
    order ? res.json(order): res.json(false);
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

app.get('/products/', (req, res)=>{
    productsCtrl.getProducts().then((products)=>{
        res.json({status:true, payload:products});
    }).catch((err)=>{
        res.json({status:false})
    })
})
app.post('/auth/facebook/callback', (req, res)=>{

})

app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/main');
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

