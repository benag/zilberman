
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var roomsSchema = new Schema({
    name: String
});

mongoose.model('Room', roomsSchema);