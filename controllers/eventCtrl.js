
"use strict";

let mongoose = require('mongoose');
let Event = mongoose.model('Event');


let eventController ={};

eventController.getEvents = ()=>{

    return Event.find({}).exec();
};
eventController.setEvent = (userId,start, end, roomId, title )=>{
    let newevent = new Event({user:userId, room:roomId, title:title, start:start, end:end});
    return newevent.save();

};


module.exports = eventController;