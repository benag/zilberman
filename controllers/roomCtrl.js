
"use strict";

let mongoose = require('mongoose');
let Room = mongoose.model('Room');


class roomController {

    constructor(){
        console.log('init rooms');
        this.init();
    }

    async init() {
        let room1 = await Room.findOne({ name:'LEONARDO' }).exec();
        let room2 = await Room.findOne({ name:'VAN GOGH' }).exec();
        if (!room1){
            let newRoom1 = new Room({name:'LEONARDO',numOfPerson: 10, points: 200, img: ['uploads/rooms/Leonardo.jpg'] });
            await newRoom1.save();
        }
        if (!room2){
            let newRoom2 = new Room({name:'VAN GOGH',numOfPerson: 10, points: 200, img: ['uploads/rooms/vanGogh.jpg'] });
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