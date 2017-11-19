
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
const config = require('../config/default');
let Profession = mongoose.model('Profession');

class professionController{

    constructor(app) {
        this.init();
    }

    async init() {
        try{
            let professions = config.professions;
            for (let profession of professions){
                let professionDB = await Profession.findOne({name: profession}).exec();
                if (!professionDB) await Profession.create({name:profession});
            }
        }catch(err){
            console.log(err);
            throw(err);
        }
    }

    getProfessions (){
        try{
            let professions = Profession.find({}).exec();
            return professions;
        }catch(err){
            return err;
        }

    }

    updateProfession (profession) {
        return Profession.findByIdAndUpdate(profession._id, {name:profession.name})
    }


    remove (profession) {
        return Profession.remove({'_id':profession._id});
    }

}

let pCtrl = new professionController();
module.exports = pCtrl;

