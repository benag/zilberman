

let mysql = require('./sqlService');

class newEntry {
    constructor(){
        this.sql = new mysql();
    };

    async save (form) {
        let gender = await this.sql.query('SELECT * FROM tGender');
        let client = await this.sql.query("SELECT * FROM tClients WHERE cTaz1 = " + form.id);
        if (client.recordset.length > 0) { //client exist already

        }else{// new client
            //cTaz1, zTaz2, cName, cFamily,
            let insert = `INSERT INTO tClients (cTaz1, zTaz2, cName, cFamily,cGender, cMobile, cPhone, cEmail) VALUES ( '038457867' , '038457867', 'בני', 'גולדנברג', 1 , '0526749884', '0526749884', 'goldenbergben@gmail.com' )`;
            let newClient = await this.sql.query(insert);
        }
        console.log(gender);
        //let result = await mysql.query(`INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate, cRemark, cSmoke, cQuitSmokeDate)`)
    }
}

module.exports = new newEntry();