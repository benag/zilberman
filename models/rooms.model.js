
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var roomsSchema = new Schema({
    version: {type:Number, default:1},
    name: String,
    img: [String],
    numOfPerson: Number,
    points: Number
});

mongoose.model('Room', roomsSchema);