
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var architectSchema = new Schema({
    version: {type:Number, default:1},
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
    images:[{
        name:String,
        path:String,
        origin:String,
        license:String

    }],
    Projects:{type: Schema.ObjectId, ref: 'Project'},
    brand:{
        
    }


});
mongoose.model('Architect', architectSchema);