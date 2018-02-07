

let mysql = require('./sqlService');

class newEntry {

    constructor(){
        this.sql = new mysql();
        this.CAR = 1;
        this.MORGAGE = 0;
        this.PRAT = 3;
        this.DIRA = 2;
    };

    async createClient(form) {

        let cTaz1 = form.id || '', cTaz2 = form.mate.id || '09', cName = form.firstName || '', cFamily = form.lastName || '', cGender = form.gender || '',
            cMobile = form.mobile || '', cPhone = form.phone || '', cEmail = form.email || '', cBDate = form.birthdate || null,
            cTazDate= form.iddate || '01/01/1900', cRemark ='' || '', cSmoke = 0 || 0, cQuitSmokeDate = '' || '01/01/1900';

        let insert = `INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate,cRemark, cSmoke, cQuitSmokeDate)
                VALUES ( '${cTaz1}' , '${cTaz2}', '${cName}', '${cFamily}', 1 , '${cMobile}','${cPhone}','${cEmail}', ${cBDate}, ${cTazDate}, '${cRemark}', 1, ${cQuitSmokeDate} )`;

        let newClient = await this.sql.query(insert);
        return newClient;
    }

    async updateClient () {

    }
    async createOrUpdateCar(form, returnObj) {

        let newCars = [];
        try{
            let cars = form.insuranceForm.cars;
            for (let car of cars){
                let carTypeID = 1, carYear = car.manDate, carRenewDate = car.renue, carHovaPrem = car.must, carMekifPrem = car.around, carInsurer = 'טסט', claimsCount = car.numsues;
                let insert = `INSERT INTO tProperty (carTypeID, carYear, carRenewDate, carHovaPrem, carMekifPrem, carInsurer, claimsCount )
                VALUES ( '${carTypeID}' , '${carYear}', '${carRenewDate}', '${carHovaPrem}', '${carMekifPrem}','${carInsurer}',')`;
                let newCar = await this.sql.query(insert);
                newCars.push(newCar);
                returnObj.msg.push('נוצר מוצר מסוג רכב');
            }
        }catch(err){
            returnObj.status = false;
        }

        return newCars;




    }

    async createOrUpdateMorgage(form, returnObj) {

        let morgage = form.insuranceForm.morgage, pFloor = morgage.floor || '', pOutOfFloor = morgage.outOfFloor || '', pSurface = morgage.surface || '', pBuildCost = morgage.cost || '', pPropertyValue = morgage.value || '';
        let insert = `INSERT INTO tProperty (pFloor, pOutOfFloor, pSurface, pBuildCost, pPropertyValue)
                VALUES ( '${pFloor}' , '${cTaz2}', '${pOutOfFloor}', '${pSurface}', '${pBuildCost}','${pPropertyValue}')`;
        let newMorgage = await this.sql.query(insert);
        returnObj.msg.push('נוצר מוצר מסוג משכנתא');
        return newMorgage;

    }

    async createOrUpdatePart(form, returnObj) {
        return {};
    }

    async createOrUpdateDira(form, returnObj) {
        //form.insuranceForm.dira.diraType
        return {};
    }

    async createOrUpdateLoan(form, returnObj) {

    }

    async createProduct( client, type, car, morgage, prati, dira, isloan,  loan, returnObj) {

    }

    async save (form) {

        let returnObj = {status:true, msg:[]};
        let client, car, morgage, prati, dira, loan;
        try{
            if (!form.id) {
                returnObj.status = false;
                returnObj.msg.push('חסר תעודת זהות');
                return returnObj;
            }


            let clients = await this.sql.query("SELECT * FROM tClients");
            console.log(clients);
            client = await this.sql.query("SELECT * FROM tClients WHERE cTaz1 = " + form.id);
            if (client.recordset.length > 0) {
                client = await this.updateClient(client.recordset[0], form);
                returnObj.msg.push('לקוח עודכן במערכת');
            }else {
                client = await this.createClient(form);
                returnObj.msg.push('לקוח נוצר במערכת');
            }

            if (client){
                let type = form.type;
                if (type === this.CAR) car = await this.createOrUpdateCar( form, returnObj );
                if (type === this.MORGAGE) morgage = await this.createOrUpdateMorgage( form, returnObj );
                if (type === this.PRAT) prati =await this.createOrUpdatePart( form, returnObj );
                if (type === this.DIRA) dira = await this.createOrUpdateDira( form, returnObj );
            }
            if (form.loan) loan = this.createOrUpdateLoan( form, returnObj );

            await this.createProduct(client, type, car, morgage, prati, dira, form.loan,  loan, returnObj);

            return returnObj;



        }catch(err){
            returnObj.status = false;
            returnObj.msg.push('תקלה בשמירת הפניה');
        }

        return returnObj;

    }
}

module.exports = new newEntry();