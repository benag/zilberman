
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var configSchema = new Schema({
    eventId: { type: Number, default: 1 }
});

mongoose.model('Config', configSchema);