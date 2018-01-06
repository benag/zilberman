
"use strict";

let mongoose = require('mongoose');
let Event = mongoose.model('Event');
const Config = mongoose.model('Config');


class eventController {

    constructor(){

    }

    getEvents( roomId ) {

        let query = {};
        if (roomId) query.room = roomId;
        return Event.find(query).lean().exec();

    }

    async setEvent ( userId,start, end, roomId, title ) {
        if (!userId || !start || !end || !roomId) throw new Error('Bad Input');
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

    async updateEvent ( id, userId, start, end, roomId, title ) {

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

    async getEvent ( id ) {
        return await Event.findOne({_id:id}).populate('user').populate('room').exec();
    }

    async deleteEvent ( id ) {
        return await Event.remove({_id: id}).exec();
    }

}

let eventCtr = new eventController();

module.exports = eventCtr;