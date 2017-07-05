
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var projectSchema = new Schema({
    projectName: String,
    address: String


});
mongoose.model('Project', projectSchema);