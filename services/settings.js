
const csv = require('csvtojson');
let mongoose = require('mongoose');
let User = mongoose.model('User');
const config = require('../config/default');


class settingService {

    constructor () {

        this.translate = {
            אדריכלות:'Architect',
            גינות: 'Gardener',
            'עיצוב פנים': 'Interior Design',
            'בתי עץ': 'Wood Construction',
            בריכות: 'Pool Construction',
            'אדריכלית נוף':'Landscape Architect',
            'מטבחי חוץ':'Outdoor Kitchens',
            'מפקח בנייה': 'Construction Inspector',
            'קבלן': 'Constructor'


        }
    }

    translateProfession(profession) {
        return this.translate[profession];
    }

    async saveUsers( usersArray ) {
        try{
            for (let user of usersArray){
                let professionArray = user.profession.split(',');
                user.firstName = user.name.split(" ")[0];
                user.lastName = user.name.split(" ")[1];
                user.name = user.firstName + ' ' + user.lastName;
                user.points = config.points;
                let firstProfession = his.translateProfession(professionArray[0]);
                //user.profession = professionArray.map( profession => this.translateProfession(profession));
                user.profession = firstProfession;
                let newUser = new User(user);
                await newUser.save();
            }
        }catch(err){
            console.log(err);
        }
    }

    loadCSV (filePath) {
        let usersArray = [];
        csv()
            .fromFile(filePath)
            .on('json',(jsonObj)=>{
                // combine csv header row and csv line to a json object
                // jsonObj.a ==> 1 or 4
                console.log(jsonObj);
                usersArray.push(jsonObj);

            })
            .on('done',(error)=>{
                console.log('end')
                this.saveUsers(usersArray);
            })

        //usrMng.
    }



}


module.exports = new settingService();