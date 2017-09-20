
"use strict";

let mongoose = require('mongoose');
let Event = mongoose.model('Event');
const Config = mongoose.model('Config');


let eventController ={};

eventController.getEvents = ()=>{

    return Event.find({}).exec();
};
eventController.setEvent = async (userId,start, end, roomId, title ) => {
    let config = await Config.findOne({});
    if (!config){
        config = await Config.create({eventId:0});
    }
    let eventId = ++config.eventId;
    let newevent = new Event({user:userId, room:roomId, title:title, start:start, end:end, eventId:eventId});
    await config.save();
    let event = await newevent.save();
    return event;

};
eventController.updateEvent = async (id, userId, start, end, roomId, title ) => {
    try{
        let event = await Event.findOne({_id:id}).exec();
        if (event){
            if (event.room.id.toString() !== roomId) event.room = roomId;
            if (event.user.id.toString() !== userId) event.user = userId;
            if (event.title !== title) event.title = title;
            if (start && event.start !== start) event.start = start;
            if (end && event.end !== end) event.end = end;
            await event.save();
            return event;
        }else{

        }

    }catch(err){
        console.log(err);
    }

}
eventController.getEvent = async (id) => {
    return await Event.findOne({_id:id}).populate('user').populate('room').exec();
}

eventController.deleteEvent = async (id) => {
    return await Event.remove({_id:id}).exec();
}



module.exports = eventController;