
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var projectSchema = new Schema({
    projectName: String,
    name:String,
    address: String,
    img: String,
    endingDate: Date,
    type: String,
    location:{lat:Number, lng:Number}

});
mongoose.model('Project', projectSchema);