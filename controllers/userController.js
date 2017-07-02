
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');

let userController ={};

userController.getUsers = (page, limit)=>{

    return User.find()
    .skip(page*limit)
    .limit(limit)
};

userController.setUsers = (user)=>{

    return User.insert()

};



module.exports = userController;