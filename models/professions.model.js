
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var professionSchema = new Schema({
    version: {type:Number, default:1},
    name:String

});
mongoose.model('Profession', professionSchema);