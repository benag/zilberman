
"use strict";

let mongoose = require('mongoose');
let Room = mongoose.model('Room');


class roomController {

    constructor(){
        this.init();
    }

    async init() {
        let room1 = Room.find({name:'Room1'}).exec();
        let room2 = Room.find({name:'Room2'}).exec();
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
        return Room.find({}).exec();
    }

    setRooms () {
        return Room.insert({}).exec();
    }
};




const roomCtrl = new roomController();
module.exports = roomCtrl;