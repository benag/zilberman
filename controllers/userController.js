
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Project = mongoose.model('Project');
const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    config = require('../config/default');


class userController {

    constructor(app){
        this.init();

    }

    async init() {
        try{
            let adminUser = await User.findOne({firstName: 'admin'}).exec();
            console.log('admin user:' + JSON.stringify(adminUser));
            if (!adminUser) await User.create({firstName: 'admin', lastName: 'admin', password: 'admin',email:'admin'});
        }catch(err){
            console.log(err);
        }


    }

    setUserInfo (user) {
        return {
            _id: user._id
            //firstName: user.firstName,
            //lastName: user.lastName,
            //email: user.email,
            //role: user.role
        };

    }

    generateToken(user) {
        console.log(config.secret);
        return jwt.sign(user, config.secret, {
            expiresIn: 100080 // in seconds
        });
    }

    async register (req, res, next) {
        // Check for registration errors
        let _this = this;
        console.log(_this);

        let email = req.body.email;
        let phone = req.body.phone;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let password = req.body.password;
        let facebookId = req.body.facebookId;
        let name = req.body.name;

        if (name && !firstName && !lastName) {
            firstName = name.split(' ')[0];
            lastName = name.split(' ')[1];
        }
        // Return error if no email provided
        if (!email && !facebookId) {
            return res.status(422).send({ error: 'You must enter an email address.'});
        }

        // Return error if full name not provided
        if (!firstName && !lastName ) {
            return res.status(422).send({ error: 'You must enter your full name.'});
        }

        // Return error if no password provided
        if (!password && !facebookId) {
            return res.status(422).send({ error: 'You must enter a password.' });
        }
        //{$or: [ {email: email}, {phone: phone} ]}
        let existingUser = await User.findOne({email:email}).exec();
        // If user is not unique, return error
        if (existingUser) {
            if (existingUser.phone !== phone) existingUser.phone = phone;
            //if (existingUser.email !== email) existingUser.email = email;
            await existingUser.save();
            return res.json({ code:100, error: 'That email address is already in use.' });
        }

        let user = new User({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            facebookId: facebookId,
            points: config.points
        });

        user.save(function(err, user) {
            if (err) { return next(err); }
            let userInfo = _this.setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + _this.generateToken(userInfo),
                user: userInfo
            });
        });

    }

    getUsers (page, limit) {
        limit = Number(limit);
        page = Number(page);
        return User.find({role:{ $ne: 'admin' }})
            .skip(page*limit)
            .limit(limit)
            .populate('projects')
            .lean()
    }

    setUser (user) {
        let newUser  = new User(user);
        newUser.points = 500;
        return newUser.save()
            .catch((err)=>{
                console.log(err);
            })
    }

    setUsers (userArray) {

        try{
            let res = db.users.insertMany(userArray)
        }catch(err){
            console.log(err);
        }
    }

    updateUser (user) {


        var userModel = new User(user);
        return User.update({_id: user._id}, userModel, {upsert: true}).exec()

    };

    setProject (id, project) {

        let newProject  = new Project(project);
        return newProject.save()
            .then((project)=>{
                return User.findByIdAndUpdate( id, { $push: { projects: newProject }}, { 'new': true}).populate('projects')
            })
            .catch((err)=>{
                console.log(err);
            })

    };

    substract (val, product, identify) {
        let identifyObj;
        if (identify === 'phone') identifyObj = {'phone': val};
        User.findOne(identifyObj).exec()
            .then(function (user) {
                if (user.points) user.points = user.points - product.price;
                return user.save();
            })
    }

    login (req, res, next) {

        let userInfo = this.setUserInfo(req.user);

        res.status(200).json({
            token: 'JWT ' + this.generateToken(userInfo),
            user: userInfo
        });
    }


    loginOld (email, pass) {
        return User.findOne({email:email,password:pass}).exec()
    };

    updateProject (project) {
        let newProject  = new Project(project);
        return Project.update({_id: project._id}, newProject, {upsert: true}).exec();

    };



    async deleteUser (id) {
        try {
            let user = await User.findById(id).populate('projects').exec();
            for (let project of user.projects){
                let id = project.id.toString();
                await Project.remove({_id:id});
            }
            return await User.remove({_id:id}).exec();
        } catch (err) {
            console.log(err);
        }
    }

};

const userContrl  = new userController();
module.exports = userContrl;

