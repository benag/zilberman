
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Project = mongoose.model('User');

let userController ={};

userController.getUsers = (page, limit)=>{

    return User.find()
    .skip(page*limit)
    .limit(limit)
};


userController.setUser = (user)=>{

    let newUser  = new User(user);
    return newUser.save()
    .catch((err)=>{
        console.log(err);
    })

};
userController.setProject = (id, project)=>{

    let newProject  = new Project(project);
    newProject.save()
    .then((project)=>{
        User.
    })
    .catch((err)=>{
        console.log(err);
    })

};




module.exports = userController;