
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
var nexmo = require('../services/nexmo');
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
            if (!adminUser) await User.create({firstName: 'admin', lastName: 'admin', password: 'admin',email:'admin', role:'admin'});
        }catch(err){
            console.log(err);
            throw(err);
        }
    }

    setUserInfo (user) {
        return {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            img: user.img
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
        let password = req.body.password;
        let name = req.body.name;


        // Return error if no email provided
        if (!email) {
            return res.status(422).send({ error: 'You must enter an email address.'});
        }


        //let existingUser = await User.findOne({phone:phone}).exec();
        let existingUser = false;
        // If user is not unique, return error
        if (existingUser) {
            //if (existingUser.phone !== phone) existingUser.phone = phone;
            ////if (existingUser.email !== email) existingUser.email = email;
            //try{
            //    await existingUser.save();
            //}catch(err){
            //    console.log(err);
            //}

            let userInfo = _this.setUserInfo(existingUser);
            return res.status(201).json({
                token: 'JWT ' + _this.generateToken({_id:userInfo._id}),
                user: userInfo
            });
            //return res.json({ code:100, error: 'That email address is already in use.' });
        }

        let user = {
            email: email,
            password: password,
            name: name,
            phone:phone

        };

        let dbUser = _this.saveUser(user);
        let randomCode = Math.floor(1000 + Math.random() * 9000);
        let returnSMS = nexmo.sms(user.phone, 'Your code is ' + randomCode );
        //user.save(function(err, user) {
        //    if (err) { return next(err); }
        let userInfo = _this.setUserInfo(dbUser);
        res.status(201).json({
            token: 'JWT ' + _this.generateToken({_id:user._id}),
            user: userInfo
        });
        //});

    }

    async findUser (id) {
        return {};
    }
    async saveUser (user) {
        return user;
    }

    async getUserByPhone (phone) {
        return User.findOne({phone:phone}).exec();
    }

    getUsers (page, limit) {
        limit = Number(limit);
        page = Number(page);

        let q = {
            role:{ $ne: 'admin' }
        }

        //if (company) q.company = { "$regex": company, "$options": "i" };
        //if (name) q.name = { "$regex": name, "$options": "i" };

        return User.find(q)
            .skip(page*limit)
            .limit(limit)
            .populate('projects, professions')
            .lean()
    }


    async setUser (user) {
        let newUser  = new User(user);
        newUser.points = 500;
        newUser.createdAt = new Date();
        newUser.name = user.firstName + ' ' + user.lastName;
        //let profession = await Profession.findOne({name:user.profession});
        //newUser.profession =  user.profession;
        newUser.status = 'Not Active';

        return newUser.save()
            .catch((err)=>{
                console.log(err);
            })
    }

    async activate (id, activate) {
        let user = await User.findById(id);
        if ( !user ) throw new Error('Couldnt find user');
        activate ? user.status = 'Active' : user.status = 'Not Active';
        return user.save();
    }

    getUser (by, value) {

        let q = {};
        q[by] = value;
        return User.findOne(q).populate('profession').lean().exec();
    }
    setUsers (userArray) {

        try{
            let res = db.users.insertMany(userArray)
        }catch(err){
            console.log(err);
        }
    }

    async updateUser (user) {
        try{
            var userModel = new User(user);
            //userModel.profession =  profession._id;
            return User.update({_id: user._id}, userModel, {upsert: true}).exec()
        }catch(err){
            console.log(err);
            throw err;
        }


    };
    updateUserImg (user) {
        return User.update({_id: user._id}, {$set:{img:user.img}}).exec();
    };


    login (req, res, next) {

        let userInfo = this.setUserInfo(req.user);

        res.status(200).json({
            token: 'JWT ' + this.generateToken({_id:req.user._id}),
            user: userInfo
        });
    }


    getUsersByFilter (by, filter, multiple) {
        let req = {};
        by = by.toLowerCase();
        let limit;
        let regex;
        if ( by !== 'points' ) {
            regex = new RegExp(filter, 'i');
            req[by] = regex;
        }else{
            req[by] = filter;
        }
        if (filter === ' ') req = {};

        multiple === 'single' ? limit = 1 : limit = 100;
        return User.find(req).limit(limit).populate('projects profession').exec();
    }

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

