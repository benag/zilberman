
"use strict";

let mongoose = require('mongoose');
let Room = mongoose.model('Room');


let roomController ={};

roomController.getRooms = ()=>{

    return Room.find({}).exec();
};
roomController.setRooms = (userId, start, end, roomId)=>{

    return Room.insert({}).exec();
};





module.exports = roomController;