
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Project = mongoose.model('Project');

let userController ={};

userController.getUsers = (page, limit)=>{

    return User.find()
    .skip(page*limit)
    .limit(limit)
    .populate('projects')
};


userController.setUser = (user)=>{

    let newUser  = new User(user);
    newUser.points = 500;
    return newUser.save()
    .catch((err)=>{
        console.log(err);
    })

};
userController.setProject = (id, project)=>{

    let newProject  = new Project(project);
    return newProject.save()
    .then((project)=>{
            return User.findByIdAndUpdate( id, { $push: { projects: newProject } })
    })
    .catch((err)=>{
        console.log(err);
    })

};




module.exports = userController;