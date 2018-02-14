

let mysql = require('./sqlService');
var LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./scratch');

class newEntry {

    constructor(){
        this.sql = new mysql();
        // type according to client;
        this.CAR = 1;
        this.MORGAGE = 0;
        this.PRAT = 3;
        this.DIRA = 2;
    };

    convertType(type) {
        if (type === this.CAR) return 3;
        if (type === this.MORGAGE) return 1;
        if (type === this.PRAT) return 2;
        if (type === this.DIRA) return 4;

    };

    wrapVal(value) {
        if (value === null || value === undefined || value === '') return null;
        return `'${value}'`;
    };
    wrapDate (date) {
        if (date === null || date === undefined || date === '') return null;
        return `${date}`;
    }

    async createMate(form) {
        let cTaz1 = this.wrapVal(form.cTaz1) , cTaz2 = this.wrapVal(form.mate.cTaz1) , cName = this.wrapVal( form.mate.cName ) , cFamily = this.wrapVal( form.mate.cFamily ) , cGender = this.wrapVal (form.mate.cGender),
            cMobile = this.wrapVal(form.mate.cMobile) , cPhone = this.wrapVal(form.mate.cPhone), cEmail = this.wrapVal(form.mate.cEmail), cBDate = this.wrapDate(form.mate.cBDate) ,
            cTazDate= this.wrapDate (form.mate.cTazDate ), cRemark = this.wrapVal(''), cSmoke = 0 , cQuitSmokeDate = this.wrapDate(form.mate.cQuitSmokeDate);
        
        let insert = `INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate,cRemark, cSmoke, cQuitSmokeDate)
                VALUES ( ${cTaz1} , ${cTaz2}, ${cName}, ${cFamily}, ${cGender} , ${cMobile},${cPhone}, ${cEmail}, ${cBDate}, ${cTazDate}, ${cRemark}, 1, ${cQuitSmokeDate} )`;

        let newClient = await this.sql.query(insert);
        return cTaz1;

    }

    async createClient(form) {

        let cTaz1 = this.wrapVal(form.client.cTaz1) , cTaz2 = this.wrapVal(form.mate.cTaz1) , cName = this.wrapVal( form.client.cName ) , cFamily = this.wrapVal( form.client.cFamily ) , cGender = this.wrapVal (form.client.cGender),
            cMobile = this.wrapVal(form.client.cMobile) , cPhone = this.wrapVal(form.client.cPhone), cEmail = this.wrapVal(form.client.cEmail), cBDate = this.wrapDate(form.client.cBDate) ,
            cTazDate= this.wrapDate (form.client.cTazDate ), cRemark = this.wrapVal(''), cSmoke = 0 , cQuitSmokeDate = this.wrapDate(form.client.cQuitSmokeDate);

        if (cTaz1 && ( cTaz2 === null || cTaz2 === undefined) ) cTaz2 = cTaz1;

        let insert = `INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate,cRemark, cSmoke, cQuitSmokeDate)
                VALUES ( ${cTaz1} , ${cTaz2}, ${cName}, ${cFamily}, ${cGender} , ${cMobile},${cPhone}, ${cEmail}, ${cBDate}, ${cTazDate}, ${cRemark}, 1, ${cQuitSmokeDate} )`;

        let newClient = await this.sql.query(insert);
        return cTaz1;
    }
    
    async updateClient (form) {

               
        // if (oldId) updateFielfds = "SET cTaz1="+
        let cTaz1 = this.wrapVal(form.id) , cTaz2 = this.wrapVal(form.mate.id) , cName = this.wrapVal( form.firstName ) , cFamily = this.wrapVal( form.lastName ) , cGender = this.wrapVal (form.gender) ,
            cMobile = this.wrapVal(form.mobile) , cPhone = this.wrapVal(form.phone), cEmail = this.wrapVal(form.email), cBDate = this.wrapDate(form.birthdate) ,
            cTazDate= this.wrapDate (form.iddate ), cRemark = this.wrapVal(''), cSmoke = 0 , cQuitSmokeDate = this.wrapDate(form.smokingDate);

        if (cTaz1 && ( cTaz2 === null || cTaz2 === undefined) ) cTaz2 = cTaz1;
        let update = `UPDATE tClients SET cTaz2 = ${cTaz2},
                        cName = ${cName},
                        cFamily = ${cFamily},
                        cGender = ${cGender},
                        cMobile = ${cMobile},
                        cPhone = ${cPhone},
                        cEmail = ${cEmail},
                        cBDate = ${cBDate},
                        cTazDate = ${cTazDate},
                        cRemark = ${cRemark},
                        cSmoke = ${cSmoke} ,
                        cQuitSmokeDate = ${cQuitSmokeDate})
                WHERE cTaz1 = ${cTaz1})`;

        let newClient = await this.sql.query(update);
        return cTaz1;



    }
    getNewId(type) {
        let id = (localStorage.getItem(type));
        id = parseInt(carid);
        if (id !== undefined && !isNaN(id)) {
            id++;
            localStorage.setItem(type, String(id));
        }else{
            id = 0 ;
            localStorage.setItem(type, '0');
        }
    }

    async createCar(form, returnObj) {


        let carid = this.getNewId('carid');
        let newCars = [];
        try{
            let cars = form.insuranceForm.cars;
            for (let car of cars){
                carid++;
                let carTypeID = 1, carYear = this.wrapVal(car.manDate), carRenewDate = this.wrapDate (car.renue ) , carHovaPrem = car.must || 0, carMekifPrem = car.around || 0, carInsurer = 'טסט',
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
  
    async createMorgage(form, returnObj) {

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

    async createPart(form, returnObj) {
        return {};
    }

    async createDira(form, returnObj) {
        //form.insuranceForm.dira.diraType
        return {};
    }

    async createLoan(form, returnObj) {
        //form.borrow.sum
        //form.borrow.intrest
        //form.borrow.years

    }
    async updateLoan(){

    }

    async createProduct( client, secondClient,type, car, morgage, prati, dira, isloan,  loan, returnObj) {

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
        let newCar;
        if (car){
            newCar = car[0];
        }else{
            newCar = null;
        }
        type = this.convertType(type);
        let insert = `INSERT INTO tProducts (pID, pCli1, pCli2, pType, propertyID, loanID, pratInsID, carInsID)
                VALUES (${pid},${client},${secondClient},${type}, ${morgage},${loan},${prati},${newCar} )`;
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
            product.clientName = client.cName;
        }
        return products;

    }
//  סוג המוצר: 1 - משכנתא, 2 - פרט, 3- רכב, 4 - דירה. רצוי לשכפל הטבלה לאתר

    async getProductFull (pid) {
        let client, secondClient, type,morgage,  propety, prati, loan, cars;
        let query = "SELECT * FROM tProducts WHERE pID=" + pid;
        let product = (await this.sql.query(query)).recordset[0];
        let pcli1 = product.pcli1;
        let pcli2 = product.pcli2;
        type = product.pType;

        if (pcli1) client = (await this.sql.query("SELECT * from tClients WHERE cTaz1=" + pcli1)).recordset[0];
        if (pcli2) secondClient = (await this.sql.query("SELECT * from tClients WHERE cTaz2=" + pcli2)).recordset[0];
        if (type === 3){
            let carId = product.carInsID;
            cars = await this.sql.query("SELECT * FROM tCars WHERE carInsID=" + carId); 
        }
        if (type === 1){
            let morageId = product.propertyID;
            morgage = await this.sql.query("SELECT * FROM tProperty WHERE propertyID=" + morageId); 
        }
        if (type === 2){
            let pratInsID = product.pratInsID;
            prati = await this.sql.query("SELECT * FROM tPratIns WHERE pratInsID=" + pratInsID); 
        }
        if (type === 4){
            // let diraId = product.propertyID;
            // propety = await this.sql.query("SELECT * FROM tPratIns WHERE pratInsID=" + pratInsID); 

        }
        if (product.loanID){
            loan = await this.sql.query("SELECT * FROM tLoans WHERE loanID=" + product.loanID); 
        }
        return { client,secondClient,type,cars,morgage,prati,loan };

    }

    async getClients(id) {
        let query;
        if (id) query = 'SELECT * FROM tClients WHERE cTaz1='+id;
        if (!id) query = 'SELECT * FROM tClients';
        let clients = await this.sql.query(query);
        return clients;
    }

   
    // async createOrUpdateClientAndMate (form, returnObj) {
    //     returnObj.msg.push('לקוח עודכן במערכת');
    //     let client = null;
    //     if (form.client.cTaz2 && form.client.cTaz1 !== form.client.cTaz2){
    //         // in thi case original taz was changed update also taz
    //         await this.updateClient(form, true);
    //     }

    //     if (formClient.id){
    //         // taz was changed update according to old id
    //         client = await this.updateClient(clientForm, clientForm.id);
    //     }else{
    //         client = await this.sql.query("SELECT * FROM tClients WHERE cTaz2 = " + clientForm.taz);
    //         if ( client && client.recordset.length > 0 ) { // client exist in the system update
    //             client = await this.updateClient(client, clientForm, mateId, false);        
    //         }else{// ccreate new client
    //             client = await this.createClient(clientForm, mateId);
    //         } 

    //     }
    // }

    // if client doesnt exist create one and mate if exist do nothing
    //create sub products and products
    async newRecord (form, returnObj){
        let cars, morgage, prati, dira, loan;
        // does client already exist?
        let client = await this.sql.query("SELECT * FROM tClients WHERE cTaz2 = " + form.client.cTaz1);
        if (!client || !client.recordset.length > 0){
            // main client doesnt exist create one
            client = await this.createClient(form);
            if (form.mate.cTaz1){
                // find if second client already exist
                let secondClient = await this.sql.query("SELECT * FROM tClients WHERE cTaz2 = " + form.client.cTaz1);
                if (!secondClient || !secondClient.recordset.length > 0)
                secondClient = await this.createMate(form.mate);
            } 
        }
        if (client){
            let type = form.type;
            if (type === this.CAR) cars = await this.createCar( form, returnObj );
            if (type === this.MORGAGE) morgage = await this.createMorgage( form, returnObj );
            if (type === this.PRAT) prati =await this.createPart( form, returnObj );
            if (type === this.DIRA) dira = await this.createDira( form, returnObj );
        }
        if (form.loan) loan = this.createLoan( form, returnObj );

        await this.createProduct(client,secondClient, form.type, cars, morgage, prati, dira, form.loan,  loan, returnObj);

        return returnObj;

    }
    // if client doesnt exist create one and mate if exist do nothing
    //create sub products and products
    async updateRecord (form) {
        if (form.client.cTaz1 !== form.client.cTaz2){
            // specific case were taz was changed TODO!1
        }
        this.updateClient(form);
        this.updateMate(form);
        let type = form.type;
        if (type === this.CAR) cars = await this.UpdateCar( form, returnObj );
        if (type === this.MORGAGE) morgage = await this.UpdateMorgage( form, returnObj );
        if (type === this.PRAT) prati =await this.UpdatePart( form, returnObj );
        if (type === this.DIRA) dira = await this.UpdateDira( form, returnObj );
        
        if (form.loan) loan = this.createOrUpdateLoan( form, returnObj );


    }
    async save (form, newRecord) {

        let returnObj = {status:true, msg:[]};
        let client = null,secondClient = null, cars = null, morgage = null, prati = null, dira = null, loan = null;
        try{
            if (!form.client.cTaz1) {
                returnObj.status = false;
                returnObj.msg.push('חסר תעודת זהות');
                return returnObj;
            }
            
            if (newRecord){
                await this.newRecord(form,returnObj);                
            }else{
                await this.updateRecord(form,returnObj);                
            } 
            // client = await this.createOrUpdateClient(form.client,form.mate, returnObj);
            // secondClient =await this.createOrUpdateClient(form.mate,null, returnObj);
            
            // if (client){
            //     let type = form.type;
            //     if (type === this.CAR) cars = await this.createOrUpdateCar( form, returnObj );
            //     if (type === this.MORGAGE) morgage = await this.createOrUpdateMorgage( form, returnObj );
            //     if (type === this.PRAT) prati =await this.createOrUpdatePart( form, returnObj );
            //     if (type === this.DIRA) dira = await this.createOrUpdateDira( form, returnObj );
            // }
            // if (form.loan) loan = this.createOrUpdateLoan( form, returnObj );

            // await this.createProduct(client, form.type, cars, morgage, prati, dira, form.loan,  loan, returnObj);

            return returnObj;

        }catch(err){
            returnObj.status = false;
            returnObj.msg.push('תקלה בשמירת הפניה');
        }

        return returnObj;

    }
}

module.exports = new newEntry();