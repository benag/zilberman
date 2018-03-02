
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let mysql = require('../services/sqlService');
let bcrypt = require('bcrypt-nodejs');
var LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./scratch');
let moment = require('moment');
var nexmo = require('../services/nexmo');
const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    config = require('../config/default');


class userController {

    constructor(){
        //this.init();
        this.sql = new mysql();

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
            uID: user.uID,
            uName: user.uName,
            uFamily: user.uFamily,
            uEmail: user.uEmail,
            uMobile: user.uMobile
            
        };

    }

    generateToken(user) {
        console.log(config.secret);
        return jwt.sign(user, config.secret, {
            expiresIn: 100080 // in seconds
        });
    }

    async sendLink (phone) {
        let usrMng = JSON.parse(localStorage.getItem('userMng'));
        if (!usrMng) {
            usrMng = {};
        }
        //usrMng.push({phone:phone,date:Date.now()});
        usrMng[phone] = Date.now();
        localStorage.setItem('userMng', JSON.stringify(usrMng));
        let link = `http://18.221.178.131:3000/register.html?phone=${phone}`;
        let returnSMS = await nexmo.sms(phone, link );
        return returnSMS;

    }
    async register (req, res) {

        // Check for registration errors
        let _this = this;
        console.log(_this);

        let email = req.body.email;
        let phone = req.body.phone;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.firstName;


        // check for live url

        let usrMng = JSON.parse(localStorage.getItem('userMng'));
        if (!usrMng) {
            usrMng = {};
        }
        let activeDateOfPhone = usrMng[phone];
        if (!activeDateOfPhone) res.status(400);
        let howManyHours = moment(Date.now()).diff(activeDateOfPhone,'hours');
        if ( howManyHours >24 ) res.status(400);

        // Return error if no email provided
        if (!email || !phone) {
            return res.status(422).send({ error: 'חסר אימייל או טלפון'});
        }


        let existingUser = await this.sql.query(`select * from tUsersAndRoles where uMobile= ${phone}`);
        // let existingUser = false;
        // If user is not unique, return error
        if (existingUser && existingUser.recordset.length > 0) {
            //if (existingUser.phone !== phone) existingUser.phone = phone;
            ////if (existingUser.email !== email) existingUser.email = email;
            //try{
            //    await existingUser.save();
            //}catch(err){
            //    console.log(err);
            //}

            let userInfo = _this.setUserInfo(existingUser.recordset[0]);
            return res.status(201).json({
                token: 'JWT ' + _this.generateToken({uID:userInfo.uID}),
                user: userInfo
            });
            //return res.json({ code:100, error: 'That email address is already in use.' });
        }

        let user = {
            uEmail: email,
            uPassword: password,
            uName: firstName,
            uFamily:lastName,
            uMobile:phone

        };

        _this.saveUser(user, (backuser) =>{
            res.status(201).json({
                token: 'JWT ' + _this.generateToken({uID:user.uID}),
                user: user
            });
        });
        //let randomCode = Math.floor(1000 + Math.random() * 9000);
        //let returnSMS = nexmo.sms(user.phone, 'Your code is ' + randomCode );
        //user.save(function(err, user) {
        //    if (err) { return next(err); }
        //let userInfo = _this.setUserInfo(dbUser);
        
        //});

    }

    async findUser (id) {
        return {};
    }

    saveUser (user, cb) {
        let id = (localStorage.getItem('uid'));
        id = parseInt(id);
        if (id !== undefined && !isNaN(id)) {
            id++;
            localStorage.setItem('uid', String(id));
        }else{
            id = 0 ;
            localStorage.setItem('uid', '0');
        }
        const SALT_FACTOR = 5;
        let _this = this;
        bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.uPassword, salt, null, async function(err, hash) {
                if (err) return false;
                user.uPassword = hash;
                await _this.sql.query(`insert into tUsersAndRoles ( uPassword, uStatus, uName, uFamily, uRole, uMobile, uEmail )
                VALUES ( '${user.uPassword}', 1, '${user.uName}', '${user.uFamily}', 1, '${user.uMobile}','${user.uEmail}' )`);                
                cb(user);
            });
        });

    }

    comparePasswords (candidatePassword,dbPassworwd, cb) {
        bcrypt.compare(candidatePassword, dbPassworwd, function(err, isMatch) {
            if (err) { return cb(err, isMatch); }
            cb(null, isMatch);
        });
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

            let uID = user.uID;
            let update = false;
            let query = "update tUsersAndRoles SET";
            let addColon = false;
            let userDB = (await this.sql.query(`select * from tUsersAdnRoles whwre uID=${uID}`)).recordset[0];
            if (!userDB || userDB.recordset.length == 0 ) throw new err();
            if (user.uMobile !== userDB.uMobile){
                query = query + " uMobile=" + user.uMobile;
                addColon = true;
            } 
            if (user.uEmail !== userDB.uEmail){
                addColon ? query = query + " ,uEmail=" + user.uEmail : query = query + " uEmail=" + user.uEmail;
                addColon = true;
            } 
            if (user.name !== (userDB.uName + ' ' + userDB.uFamily)){
                addColon ? query = query + " ,uName=" + user.uName  + " ,uFamily=" + user.uFamily : query = query + " uName=" + user.uName  + " ,uFamily=" + user.uFamily
                addColon = true;
            } 
            if (user.uRole !== userDB.uRole){
                addColon ? query = query + " ,uRole=" + user.uRole : query = query + " uRole=" + user.uRole ;
            }

            query = query + " WHERE uID="+user.uID;
            console.log(query);
            let updated = await this.sql.query(query);
            return updated;
            // if (user.uFamily !== userDB.uFamily) userDB.uFamily =  user.uFamily;
            // this.sql.query(`update tUsersAndRoles SET `)
        }catch(err){
            console.log(err);
            throw err;
        }


    };
    updateUserImg (user) {
        return User.update({_id: user._id}, {$set:{img:user.img}}).exec();
    };

    // async getAllUsers () {
    //     let users = await this.sql.query("select uName, UFamily, uRole,uStatus, uMobile,uEmail from tUsersAndRoles");
    //     return users.recordset;
    // }

    async sendSMS (req) {
        let randomNum = Math.floor(1000 + Math.random() * 9000);
        randomNum = String(randomNum);
        await this.sql.query(`insert into tUsersAndRoles (uSmsCode, uSmsDate) values ('${randomNum}', '${Date.now()}')`);
        let returnSMS = await nexmo.sms(user.uMobile, 'הכנס קוד: ' + randomNum);
                

    }

    async login (req, res, next) {

        // get user
        let dbUser  = await this.sql.query(`select * from tUsersAndRoles where uTaz='${req.body.id}'`);

        // no user found 
        if (!dbUser || dbUser.recordset.length === 0) return res.status(400).json('משתמש לא נמצא');     
        let user = dbUser.recordset[0];
        let returnUser = this.setUserInfo(user);

        if (user.uStatus === 3) return res.status(400).send('משתמש נעול');
        if (user.uStatus === 2) return res.status(400).send('משתמש מוקפא');

        // login by sms

        if (req.body.sms){
            let now = moment();
            let created = moment(user.uSmsDate);
            let diffHours = moment.duration(now.diff(created)).asHours();
        
            if (req.body.sms === user.uSmsCode && diffHours < 24){
                res.status(200).json({
                    token: 'JWT ' + this.generateToken({ uID: user.uID }),
                    user: returnUser,
                });
            }else{
                return res.status(400).send('קוד סמס שוגי או עברו מעל 24 שעות');
            }
        }

        // login by password
        
        this.comparePasswords(req.body.password, user.uPassword, async (err, isMatch) => {
            if (isMatch){
                res.status(200).json({
                    token: 'JWT ' + this.generateToken({uID:user.uID}),
                    user: returnUser,
                });
            }else{
                if (user.uLoginAttempts >= 4){
                    // already 4 attempts tried loack user and update login attemptes
                    await this.sql.query(`update tUsersAndRoles set uLoginAttempts=5, uStatus=3 where uID = ${user.uID}`);
                }else{
                    let attempts = user.uLoginAttempts +1;
                    await this.sql.query(`update tUsersAndRoles set uLoginAttempts=${attempts} where uID = ${user.uID}`);
                }
                res.status(400).send('wrong password');
            }
            
        })
        
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


module.exports = new userController();

