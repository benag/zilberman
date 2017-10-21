
"use strict";

let mongoose = require('mongoose');
let Room = mongoose.model('Room');


class roomController {

    constructor(){
        console.log('init rooms');
        this.init();
    }

    async init() {
        let room1 = await Room.findOne({name:'Room1'}).exec();
        let room2 = await Room.findOne({name:'Room2'}).exec();
        if (!room1){
            let newRoom1 = new Room({name:'Room1'});
            await newRoom1.save();
        }
        if (!room2){
            let newRoom2 = new Room({name:'Room2'});
            await newRoom2.save();
        }
    }

    getRooms () {
        return Room.find({}).lean().exec();
    }

    setRooms (room) {
        return Room.create(room).exec();
    }
};




const roomCtrl = new roomController();
module.exports = roomCtrl;