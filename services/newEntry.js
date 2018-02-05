

let mysql = require('sqlService');

class newEntry {
    constructor(){
        this.sql = new mysql();
    };

    async save (form) {
        let gender = await mysql.query('SELECT * FROM tGender');
        console.log(gender);
        //let result = await mysql.query(`INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate, cRemark, cSmoke, cQuitSmokeDate)`)
    }
}

module.exports = newEntry;