
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var configSchema = new Schema({
    version: {type:Number, default:1},
    eventId: { type: Number, default: 1 }
});

mongoose.model('Config', configSchema);