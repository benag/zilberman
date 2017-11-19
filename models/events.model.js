
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var eventsSchema = new Schema({
    version: {type:Number, default:1},
    user: {type: Schema.ObjectId, ref: 'User'},
    room: {type: Schema.ObjectId, ref: 'Room'},
    eventId: Number,
    title: String,
    desc: String,
    start: Date,
    end: Date
});

mongoose.model('Event', eventsSchema);