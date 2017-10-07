
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Project = mongoose.model('Project');
const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    config = require('../config/default');


class userController {

    constructor(app){


    }


    setUserInfo (user) {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        };

    }

    generateToken(user) {
        return jwt.sign(user, config.secret, {
            expiresIn: 100080 // in seconds
        });
    }

    register (req, res, next) {
        // Check for registration errors
        let _this = this;
        console.log(_this);

        let email = req.body.email;
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
        if (!password && !faccebookId) {
            return res.status(422).send({ error: 'You must enter a password.' });
        }

        User.findOne({ email: email }, function(err, existingUser) {
            if (err) { return next(err); }

            // If user is not unique, return error
            if (existingUser) {
                return res.status(422).send({ error: 'That email address is already in use.' });
            }

            // If email is unique and password was provided, create account
            let user = new User({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                facebookId: facebookId
            });

            user.save(function(err, user) {
                if (err) { return next(err); }

                // Subscribe member to Mailchimp list
                // mailchimp.subscribeToNewsletter(user.email);

                // Respond with JWT if user was created

                let userInfo = _this.setUserInfo(user);

                res.status(201).json({
                    token: 'JWT ' + _this.generateToken(userInfo),
                    user: userInfo
                });
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

        let userInfo = setUserInfo(req.user);

        res.status(200).json({
            token: 'JWT ' + generateToken(userInfo),
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

