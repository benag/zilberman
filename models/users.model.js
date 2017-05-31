
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    userName: String,
    phone: { type : String , unique : true, required : true },
    role: String,
    status: String,// register,verified
    ARN: String,
    smsCode: String,
    APIToken: String,
    socketId: String,
    os: String
});
mongoose.model('User', clientSchema);