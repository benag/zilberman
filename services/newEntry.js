

let mysql = require('./sqlService');

class newEntry {
    constructor(){
        this.sql = new mysql();
    };

    async save (form) {

        let returnObj = {status:true, msg:[]};
        if (!form.id) {
            returnObj.status = false;
            returnObj.msg.push('חסר תעודת זהות');
            return returnObj;
        }

        let gender = await this.sql.query('SELECT * FROM tGender');
        //let client = await this.sql.query("SELECT * FROM tClients WHERE cTaz1 = " + form.id);
        //if (client.recordset.length > 0) { //client exist already

        //}else{// new client
            let cTaz1 = form.id || '', cTaz2 = form.mate.id || '09', cName = form.firstName || '', cFamily = form.lastName || '', cGender = form.gender || '',
                cMobile = form.mobile || '', cPhone = form.phone || '', cEmail = form.email || '', cBDate = form.birthdate || null,
                cTazDate= form.iddate || null, cRemark ='' || '', cSmoke = 0 || 0, cQuitSmokeDate = null || null;
            //let insert = `INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail,cBDate, cTazDate, cRemark, cSmoke, cQuitSmokeDate)
            //    VALUES ( ${cTaz1} , ${cTaz2}, ${cName}, ${cFamily}, ${cGender} , ${cMobile}, ${cPhone}, ${cEmail}, ${cTazDate}, ${cRemark}, ${cSmoke}, ${cQuitSmokeDate} )`;
            let insert = `INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate,cRemark, cSmoke, cQuitSmokeDate)
                VALUES ( '${cTaz1}' , '${cTaz2}', '${cName}', '${cFamily}', 1 , '${cMobile}','${cPhone}','${cEmail}', ${cBDate}, ${cTazDate}, ${cRemark}, ${cSmoke}, ${cQuitSmokeDate} )`;
            let newClient = await this.sql.query(insert);
        //}
        console.log(gender);
        return gender;
        //let result = await mysql.query(`INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate, cRemark, cSmoke, cQuitSmokeDate)`)
    }
}

module.exports = new newEntry();