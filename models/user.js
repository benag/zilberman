
'use strict';

var mongoose = require('mongoose'),
    restful = require('node-restful'),
    Schema = mongoose.Schema;


module.exports.initUser = function(app) {
    console.log('init user');
    var userSchema = new Schema({
        firstName: String,
        lastName: String,
        password: String,
        userName: String,
        phone: { type : String , unique : true, required : true }

    });
    var Resource = app.resource = restful.model('User', userSchema)
        .methods(['get', 'post', 'put', 'delete']);
    Resource.register(app, '/users');
    mongoose.model('User', userSchema);
};



