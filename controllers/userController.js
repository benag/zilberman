
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Project = mongoose.model('Project');

let userController ={};

userController.getUsers = (page, limit)=>{

    limit = Number(limit);
    page = Number(page);
    return User.find({role:{ $ne: 'admin' }})
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
userController.updateUser = (user)=>{

    //let update ={
    //    $set:{
    //        firstName: user.firstName ? user.firstName: ,
    //        lastName: user.lastName,
    //        company: user.company,
    //        about: user.about,
    //        points: user.points,
    //        description: user.description,
    //        email: user.email,
    //        profession: user.profession,
    //        projects: user.projects,
    //        title: user.title,
    //        img: user.img,
    //        website:user.website,
    //        address:user.address,
    //        phone: user.phone
    //    }
    //}
    //return User.findByIdAndUpdate(user._id, update, { new: true }).exec()
    var userModel = new User(user);
    return User.update({_id: user._id}, userModel, {upsert: true}).exec()
        //return User.findOneAndUpdate(user._id, user, {
    //    overwrite : true,
    //    new: true
    //
    //}).exec();
    //return User.findByIdAndUpdate( { "_id": bookId }, user);


};

userController.setProject = (id, project)=>{

    let newProject  = new Project(project);
    return newProject.save()
    .then((project)=>{
            return User.findByIdAndUpdate( id, { $push: { projects: newProject }}, { 'new': true}).populate('projects')
    })
    .catch((err)=>{
        console.log(err);
    })

};

userController.substract = (val, product, identify) =>{
    let identifyObj;
    if (identify === 'phone') identifyObj = {'phone': val};
    User.findOne(identifyObj).exec()
    .then(function(user){
        if (user.points) user.points = user.points - product.price;
        return user.save();
    })

};

userController.login = (email, pass)=>{
    return User.findOne({email:email,password:pass}).exec()
};

userController.updateProject = (project)=>{
    let newProject  = new Project(project);
    return Project.update({_id: project._id}, newProject, {upsert: true}).exec();

};



module.exports = userController;