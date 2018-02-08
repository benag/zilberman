

let mysql = require('./sqlService');
var LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./scratch');

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
        return cTaz1;
    }

    async updateClient () {

    }
    async createOrUpdateCar(form, returnObj) {

        let carid = (localStorage.getItem('carid'));
        carid = parseInt(carid);
        if (carid !== undefined && !isNaN(carid)) {
            carid++;
            localStorage.setItem('carid', String(carid));
        }else{
            carid = 0 ;
            localStorage.setItem('carid', '0');
        }

        let newCars = [];
        try{
            let cars = form.insuranceForm.cars;
            for (let car of cars){
                carid++;
                let carTypeID = 1, carYear = car.manDate || '1900', carRenewDate = car.renue || '01/01/1900', carHovaPrem = car.must || 0, carMekifPrem = car.around || 0, carInsurer = 'טסט',
                    claimsCount = car.numsues || 0;
                //TODO Fix claim count
                let insert = `INSERT INTO tCarIns (carInsID, carTypeID, carYear, carRenewDate, carHovaPrem, carMekifPrem, carInsurer, claimsCount ) VALUES ( ${carid},'${carTypeID}' , '${carYear}', ${carRenewDate}, '${carHovaPrem}', '${carMekifPrem}','1',${claimsCount} )`;
                let newCar = await this.sql.query(insert);
                newCars.push(carid);
                returnObj.msg.push('נוצר מוצר מסוג רכב');
            }
            localStorage.setItem('carid', String(carid));
        }catch(err){
            returnObj.status = false;
        }

        return newCars;




    }

    async createOrUpdateMorgage(form, returnObj) {

        let id = (localStorage.getItem('id'));
        id = parseInt(id);
        if (id !== undefined && !isNaN(id)) {
            id++;
            localStorage.setItem('id', String(id));
        }else{
            id = 0 ;
            localStorage.setItem('id', '0');
        }
        let morgage = form.insuranceForm.morgage, pFloor = morgage.floor || 0, pOutOfFloor = morgage.outOfFloor || 0, pSurface = morgage.surface || 0, pBuildCost = morgage.cost || 0, pPropertyValue = morgage.value || 0;
        let insert = `INSERT INTO tProperty (propertyID, pFloor, pOutOfFloor, pSurface, pBuildCost, pPropertyValue)
                VALUES ( ${id},'${pFloor}' , '${pOutOfFloor}', '${pSurface}', '${pBuildCost}','${pPropertyValue}')`;
        let newMorgage = await this.sql.query(insert);
        returnObj.msg.push('נוצר מוצר מסוג משכנתא');
        return id;

    }

    async createOrUpdatePart(form, returnObj) {
        return {};
    }

    async createOrUpdateDira(form, returnObj) {
        //form.insuranceForm.dira.diraType
        return {};
    }

    async createOrUpdateLoan(form, returnObj) {
        //form.borrow.sum
        //form.borrow.intrest
        //form.borrow.years

    }

    async createProduct( client, type, car, morgage, prati, dira, isloan,  loan, returnObj) {

        let clients = await this.getClients(client);
        console.log(clients);
        let pID, pCli1, pCli2, pType, propertyID, loanID, pratInsID, carInsID;

        let pid = (localStorage.getItem('pid'));
        pid = parseInt(pid);
        if (pid !== undefined && !isNaN(pid)) {
            pid++;
            localStorage.setItem('pid', String(pid));
        }else{
            pid = 0 ;
            localStorage.setItem('pid', '0');
        }

        let insert = `INSERT INTO tProducts (pID, pCli1, pCli2, pType, propertyID, loanID, pratInsID, carInsID)
                VALUES (${pid},${client},${client},${type}, ${morgage},${loan},${prati},${car[0]} )`;
        let newProduct = await this.sql.query(insert);

        return newProduct;

    }

    async getProducts () {

        let query = 'SELECT * FROM tProducts';
        let products = await this.sql.query(query);
        products = products.recordset;
        for (let product of products){
            let cliId = product.pCli1;
            let client = this.getClients(cliId);
            product.clientName = client;
        }
        return products;

    }

    async getClients(id) {
        let query;
        if (id) query = 'SELECT * FROM tClients WHERE cTaz1='+id;
        if (!id) query = 'SELECT * FROM tClients';
        let clients = await this.sql.query(query);
        return clients;
    }
    async save (form) {

        let returnObj = {status:true, msg:[]};
        let client = null, cars = null, morgage = null, prati = null, dira = null, loan = null;
        try{
            if (!form.id) {
                returnObj.status = false;
                returnObj.msg.push('חסר תעודת זהות');
                return returnObj;
            }

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
                if (type === this.CAR) cars = await this.createOrUpdateCar( form, returnObj );
                if (type === this.MORGAGE) morgage = await this.createOrUpdateMorgage( form, returnObj );
                if (type === this.PRAT) prati =await this.createOrUpdatePart( form, returnObj );
                if (type === this.DIRA) dira = await this.createOrUpdateDira( form, returnObj );
            }
            if (form.loan) loan = this.createOrUpdateLoan( form, returnObj );

            await this.createProduct(client, form.type, cars, morgage, prati, dira, form.loan,  loan, returnObj);

            return returnObj;

        }catch(err){
            returnObj.status = false;
            returnObj.msg.push('תקלה בשמירת הפניה');
        }

        return returnObj;

    }
}

module.exports = new newEntry();