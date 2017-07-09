
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var projectSchema = new Schema({
    projectName: String,
    address: String,
    Date: Date,
    Type: String

});
mongoose.model('Project', projectSchema);