
const csv = require('csvtojson');


class settingService {

    constructor () {

    }

    turnJsonToDocuments(json) {

    }

    loadCSV (filePath) {

        csv()
            .fromFile(csvFilePath)
            .on('json',(jsonObj)=>{
                // combine csv header row and csv line to a json object
                // jsonObj.a ==> 1 or 4
                console.log(jsonObj);
            })
            .on('done',(error)=>{
                console.log('end')
            })
        let records = turnJsonToDocuments(file);
        //usrMng.
    }



}


module.exports = new settingService();