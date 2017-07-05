
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    userName: String,
    company: String,
    about:String,
    email: String,
    profession: String,
    projects: [{}],
    title: String,
    img: String,
    address:String,
    phone: String,
    role: String,
    status: String,// register,verified
    ARN: String,
    smsCode: String,
    APIToken: String,
    socketId: String,
    os: String
});
mongoose.model('User', userSchema);