

let mysql = require('./sqlService');
let moment = require('moment');
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

    wrapVal (value) {
        if (value === null || value === undefined || value === '') return null;
        return `'${value}'`;
    };

    wrapDate (value) {
        if (value === null || value === undefined || value === '') return null;
        return `${value}`;
    };

    wrapNum (value) {
        if (value === null || value === undefined || value === '') return null;
        return value;
    }
   
    async save (form, newRecord) {

        let returnObj = {status:true, msg:[]};
        let client = null,secondClient = null, cars = null, morgage = null, prati = null, dira = null, loan = null, product = null;
        try{
            if (!form.client.cTaz1) {
                returnObj.status = false;
                returnObj.msg.push('חסר תעודת זהות');
                return returnObj;
            }
            if (form.type === undefined || form.type === null) {
                returnObj.status = false;
                returnObj.msg.push('חסר סוג הפניה');
                return returnObj;
            }
            
            if (newRecord){
                //logger.info(`creating record with form: ${JSON.stringify(form)}`);
                product = await this.newRecord(form,returnObj);                
            }else{
                //logger.info(`updating record with form: ${JSON.stringify(form)}`);
                product = await this.updateRecord(form,returnObj);              
            } 
        
            

        }catch(err){
            console.log(err);
            returnObj.status = false;
            returnObj.msg.push('תקלה בשמירת הפניה');
        }
        returnObj.product = product;
        return returnObj;

    }

    async createMate(form) {

        let cTaz1 = this.wrapVal(form.client.cTaz1) , cTaz2 = this.wrapVal(form.mate.cTaz2) , cName = this.wrapVal( form.mate.cName ) , cFamily = this.wrapVal( form.mate.cFamily ) , cGender = this.wrapVal (form.mate.cGender),
            cMobile = this.wrapVal(form.mate.cMobile) , cPhone = this.wrapVal(form.mate.cPhone), cEmail = this.wrapVal(form.mate.cEmail), cBDate = this.wrapDate(form.mate.cBDate) ,
            cTazDate= this.wrapDate (form.mate.cTazDate ), cRemark = this.wrapVal(''), cSmoke = 0 , cQuitSmokeDate = this.wrapDate(form.mate.cQuitSmokeDate);
        
        let insert = `INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate,cRemark, cSmoke, cQuitSmokeDate)
                VALUES ( ${cTaz1} , ${cTaz2}, ${cName}, ${cFamily}, ${cGender} , ${cMobile},${cPhone}, ${cEmail}, ${cBDate}, ${cTazDate}, ${cRemark}, 1, ${cQuitSmokeDate} )`;

        let newClient = await this.sql.query(insert);
        return form.mate.cTaz2;

    }

    async createClient(form) {

        let cTaz1 = this.wrapVal(form.client.cTaz1) , cTaz2 = this.wrapVal(form.mate.cTaz1) , cName = this.wrapVal( form.client.cName ) , cFamily = this.wrapVal( form.client.cFamily ) , cGender = this.wrapVal (form.client.cGender),
            cMobile = this.wrapVal(form.client.cMobile) , cPhone = this.wrapVal(form.client.cPhone), cEmail = this.wrapVal(form.client.cEmail), cBDate = this.wrapDate(form.client.cBDate) ,
            cTazDate= this.wrapDate (form.client.cTazDate ), cRemark = this.wrapVal(''), cSmoke = 0 , cQuitSmokeDate = this.wrapDate(form.client.cQuitSmokeDate);

        cTaz2 = cTaz1;

        let insert = `INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate,cRemark, cSmoke, cQuitSmokeDate)
                VALUES ( ${cTaz1} , ${cTaz2}, ${cName}, ${cFamily}, ${cGender} , ${cMobile},${cPhone}, ${cEmail}, ${cBDate}, ${cTazDate}, ${cRemark}, 1, ${cQuitSmokeDate} )`;

        let newClient = await this.sql.query(insert);
        return cTaz1;
    }

    async createCar(form, returnObj) {


        let carid = this.getNewId('carid');
        let newCars = [];
        try{
            let cars = form.insuranceForm.cars;
            for (let car of cars){
                carid++;
                let carTypeID = 1, carYear = this.wrapVal(car.carYear), carRenewDate = this.wrapVal (car.carRenewDate ) ,
                    carHovaPrem = this.wrapVal(car.carHovaPrem), carMekifPrem = this.wrapVal(car.carMekifPrem), carInsurer = 'טסט',
                    claimsCount = this.wrapVal(car.claimsCount);
                //TODO Fix claim count
                let insert = `INSERT INTO tCarIns (carInsID, carTypeID, carYear, carRenewDate, carHovaPrem, carMekifPrem, carInsurer, claimsCount ) VALUES ( ${carid},${carTypeID} , ${carYear}, ${carRenewDate}, ${carHovaPrem}, ${carMekifPrem},'1',${claimsCount} )`;
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
        
        let pFloor = this.wrapNum(form.insuranceForm.morgage.pFloor), pOutOfFloor = this.wrapNum(form.insuranceForm.morgage.pOutOfFloor), pSurface = this.wrapNum(form.insuranceForm.morgage.pSurface),
         pBuildCost = this.wrapNum(form.insuranceForm.morgage.pBuildCost), pPropertyValue = this.wrapNum(form.insuranceForm.morgage.pPropertyValue);
        let insert = `INSERT INTO tProperty (propertyID, pFloor, pOutOfFloor, pSurface, pBuildCost, pPropertyValue)
                VALUES ( ${id},${pFloor} , ${pOutOfFloor}, ${pSurface}, ${pBuildCost},${pPropertyValue})`;
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
    
    /**
     * Get the client object iterate over it and crteate an update string
     * In the exception of cTaz1 and cTaz2.
     */

    sqlBuilder (dbObject, clientObj, query) {
        
        let sqlFieledBuilder = (query, field, val, index) => {
            val = this.wrapVal(val);
            if (index === 0) {
                query =  query + `SET ${field} = ${val}`;
            }else{
                query =  query + ` ,${field} = ${val}`;
            }  
            return query;
        }

        let index = 0;
        for (let field in dbObject){
            
            if (field !== 'cTaz1' && field !== 'cTaz2'){
                if (field.indexOf('date') !== -1 || field.indexOf('Date') !== -1){
                    let dbDate = moment(dbObject[field]);
                    
                    if ( dbDate.format('DD/MM/YYYY') !== clientObj[field]) {
                        query = sqlFieledBuilder(query,field, clientObj[field],index);
                        index++;            
                    }
                }else{
                    if (dbObject[field] !== clientObj[field]){
                        query = sqlFieledBuilder(query,field, clientObj[field],index);
                        index++;            
                    }
                }
                 
            }
        }
        return {query,index};

    }

    async UpdateMorgage (form){
        let query = 'UPDATE tProperty ';
        let dbMorgage = await this.sql.query(`SELECT * FROM tProperty WHERE propertyID=` + form.insuranceForm.morgage.propertyID);
        if (dbMorgage && dbMorgage.recordset.length > 0){
            let build = this.sqlBuilder (dbMorgage.recordset[0], form.insuranceForm.morgage, query );
            if (build.index > 0 ) {
                query = build.query;
                query += ` WHERE propertyID=` + form.insuranceForm.morgage.propertyID;
                let newMorgage = await this.sql.query(query);
            }
            
        }
        return form.insuranceForm.morgage.propertyID;
        

    }

    

    async UpdateCar (form){
        
        let newCar;
        // let newCars = [];
        //let dbProducts = await this.sql.query(`SELECT * FROM tProducts WHERE cTaz1=${form.client.cTaz2} AND pType=3`);
        //if (dbProducts && dbProducts.recordset.length > 0){
            //let cars = dbProducts.recordset.filtemapr( (product) => product.carInsID);
            //for (let i=0; i<cars.length;i++){
                let carRecordSet = await this.sql.query(`select * from tCarIns where carInsID=${form.insuranceForm.cars[0].carInsID}`);
                if (carRecordSet && carRecordSet.recordset.length > 0){
                    let car = carRecordSet.recordset[0];
                    let query = 'UPDATE tCarIns ';
                    let build = this.sqlBuilder (car, form.insuranceForm.cars[0], query );
                    if (build.index > 0){
                        query = (this.sqlBuilder (car, form.insuranceForm.cars[0], query )).query;
                        query += ` WHERE carInsID=` + form.insuranceForm.cars[0].carInsID;
                        await this.sql.query(query);
                    }
                    
                    return car.carInsID;        
                }
                //let car = cars[i];
                // let query = 'UPDATE tCarIns ';
                // //let carDb = await this.sqlBuilder.query(`SELECT FROM tCarIns WHERE carInsID=${car}`);
                // query = this.sqlBuilder (car, form.insuranceForm.cars[0], query );
                // query += ` WHERE carInsID=` + form.insuranceForm.cars[0].carInsID;
                // await this.sqlBuilder.query(query);
                // newCars.push(car);
            //}
        //}
        //return newCar;
        

    }
    async updateMate (form) {
        let query = 'UPDATE tClients ';
        let dbClient;

        if (form.mate.id !== form.mate.cTaz2){
            dbClient = await this.sql.query(`SELECT * from tClients where cTaz2=${form.mate.id} AND cTaz1 = ${form.client.cTaz2}`);    
        }else{
            dbClient = await this.sql.query(`SELECT * from tClients where cTaz2=${form.mate.cTaz2} AND cTaz1 = ${form.client.cTaz2}`);
        }
        
        if (dbClient && dbClient.recordset.length > 0){
            let mate = dbClient.recordset[0];
            if (form.mate.cTaz2 !== form.mate.id) query += ` cTaz2 = ${form.mate.cTaz2}, `;
            let build = this.sqlBuilder (mate, form.mate,query );
            if (build.index > 0) {
                query =  build.query;
                query += ` WHERE cTaz2=${form.mate.id} AND cTaz1 = ${form.client.cTaz2}`;
            }
           //let textQuery = "UPDATE tClients SET cFamily = 'tt', cTazDate = 01/01/2012 WHERE cTaz1=2222224";
            let newMate = await this.sql.query(query);
        }
     
        return form.mate.cTaz2;
    }

    async updateClient (form) {

        let query = 'UPDATE tClients ';
        let dbClient = await this.sql.query(`SELECT * from tClients where cTaz1=${form.client.cTaz2} AND cTaz1 = cTaz2`);
        
        
        if (dbClient && dbClient.recordset.length > 0){
            let client = dbClient.recordset[0];
            if (client.cTaz1 !== form.client.cTaz1) query += ` cTaz1=${form.client.cTaz1}, cTaz2 = ${form.client.cTaz1}, `;
            let build = this.sqlBuilder (client, form.client,query );
            if (build.index > 0) {
                query = build.query;
                query += ` WHERE cTaz1=${form.client.cTaz2}` 
                //let textQuery = "UPDATE tClients SET cFamily = 'tt', cTazDate = 01/01/2012 WHERE cTaz1=2222224";
                let newClient = await this.sql.query(query);
            }
        }
     
        return form.client.cTaz2;



    }
    getNewId(type) {
        let id = (localStorage.getItem(type));
        id = parseInt(id);
        if (id !== undefined && !isNaN(id)) {
            id++;
            localStorage.setItem(type, String(id));
            return id;
        }else{
            id = 0 ;
            localStorage.setItem(type, '0');
            return id;
        }
    }

  


    async updateLoan (form) {
        let query = 'UPDATE tLoans ';
        let dbLoanRecordset = await this.sql.query(`SELECT * from tLoans where loanID=${form.borrow.loanID}`);
        
        if (dbLoanRecordset && dbLoanRecordset.recordset.length >0){
            
            let loan = dbLoanRecordset.recordset[0];
            let query = 'UPDATE tLoans ';
            let build = this.sqlBuilder (loan, form.borrow, query );
            if (build.index > 0){
                query = build.query;
                query += ` WHERE loanID=` + form.borrow.loanID;
                await this.sql.query(query);
            }
            
            return loan.loanID;        
        }
    }
    async createLoan(form, returnObj) {

        let id = (localStorage.getItem('loanId'));
        id = parseInt(id);
        if (id !== undefined && !isNaN(id)) {
            id++;
            localStorage.setItem('loanId', String(id));
        }else{
            id = 0 ;
            localStorage.setItem('loanId', '0');
        }
        
 
        let loanID = this.wrapVal(id) , loanBank = this.wrapVal(form.borrow.loanBank) , loanValue = this.wrapVal( form.borrow.loanValue ),
        loanRate = this.wrapVal( form.borrow.loanRate ) , loanYrsToPay = this.wrapVal (form.borrow.loanYrsToPay),
        loanType = this.wrapVal(form.borrow.loanType);


        let insert = `INSERT INTO tLoans (loanID, loanBank, loanValue, loanRate, loanYrsToPay, loanType)
                VALUES ( ${loanID} , ${loanBank}, ${loanValue}, ${loanRate}, ${loanYrsToPay} , ${loanType} )`;

        let newLoan = await this.sql.query(insert);
        return id;
        

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
        if (secondClient === undefined) secondClient = null;

        morgage = this.wrapNum(morgage);
        loan = this.wrapNum(loan);
        prati = this.wrapNum(prati);
        let CarDB = this.wrapNum(newCar);
        let insert = `INSERT INTO tProducts (pID, pCli1, pCli2, pType, propertyID, loanID, pratInsID, carInsID)
                VALUES (${pid},${client},${secondClient},${type}, ${morgage},${loan},${prati},${CarDB} )`;
        let newProduct = await this.sql.query(insert);

        //loan = this.wrapVal(loan);
        return {productId:pid, type, morgage,loan,prati,newCar};

    }

    async getProducts (like) {

        let query;
        if (like) {
            var isnum = /^\d+$/.test(like);
            if (isnum){
                query = `SELECT TOP(100) * FROM tProducts, tClients WHERE tProducts.pCli1 = tClients.cTaz1 AND tClients.cTaz1 = tClients.cTaz2 AND tClients.cTaz1 LIKE ${like} ORDER BY tProducts.pID`;
            }else{
                query = `SELECT TOP(100) * FROM tProducts, tClients WHERE tProducts.pCli1 = tClients.cTaz1 AND tClients.cTaz1 = tClients.cTaz2 AND tClients.cName LIKE '${like}' OR tClients.cFamily LIKE '${like}' ORDER BY tProducts.pID`; 
            }
        }else{
            query = 'SELECT TOP(100) * FROM tProducts, tClients WHERE tProducts.pCli1 = tClients.cTaz1 AND tClients.cTaz1 = tClients.cTaz2 ORDER BY tProducts.pID';
        } 
        let products = await this.sql.query(query);
        products = products.recordset;
        return products;

    }
//  סוג המוצר: 1 - משכנתא, 2 - פרט, 3- רכב, 4 - דירה. רצוי לשכפל הטבלה לאתר

    async getProductFull (pid) {
        let client, secondClient, type,morgage,  propety, prati, loan, cars;
        let query = "SELECT * FROM tProducts WHERE pID=" + pid;
        let product = (await this.sql.query(query)).recordset[0];
        let pcli1 = product.pCli1;
        let pcli2 = product.pCli2;
        type = product.pType;

        if (pcli1) client = (await this.sql.query("SELECT * from tClients WHERE cTaz1=" + pcli1)).recordset[0];
        if (pcli2) secondClient = (await this.sql.query("SELECT * from tClients WHERE cTaz2=" + pcli2)).recordset[0];
        if (type === 3){
            let carId = product.carInsID;
            cars = await this.sql.query("SELECT * FROM tCarIns WHERE carInsID=" + carId);
            cars = cars.recordset[0];
        }
        if (type === 1){
            let morageId = product.propertyID;
            morgage = await this.sql.query("SELECT * FROM tProperty WHERE propertyID=" + morageId); 
            morgage = morgage.recordset[0];
        }
        if (type === 2){
            let pratInsID = product.pratInsID;
            prati = await this.sql.query("SELECT * FROM tPratIns WHERE pratInsID=" + pratInsID); 
            prati = prato.recprdset[0];
        }
        if (type === 4){
            // let diraId = product.propertyID;
            // propety = await this.sql.query("SELECT * FROM tPratIns WHERE pratInsID=" + pratInsID); 

        }
        if (product.loanID){
            loan = await this.sql.query("SELECT * FROM tLoans WHERE loanID=" + product.loanID);
            loan = loan.recordset[0];
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

   
   

    // if client doesnt exist create one and mate if exist do nothing
    //create sub products and products
    async newRecord (form, returnObj){
        let cars,client, secondClient, morgage, prati, dira, loan, product;
        // does client already exist?
        client = await this.sql.query("SELECT * FROM tClients WHERE cTaz2 = " + form.client.cTaz1);
        if (!client || !client.recordset.length > 0){
            // main client doesnt exist create one
            client = await this.createClient(form);
            if (form.mate.cTaz2) secondClient = await this.createMate(form);
            
           
        }else{
            // main client exist
            client = client.recordset[0].cTaz1;
            // is second client exist?
            if (form.mate.cTaz1) {
                secondClient = await this.sql.query("SELECT * FROM tClients WHERE cTaz2 = " + form.mate.cTaz1);
                if (!secondClient || !secondClient.recordset.length > 0) {
                    // if doesnt exist create it
                    secondClient = await this.createMate(form);
                }else{
                    secondClient = secondClient.recordset[0].cTaz2;
                }
            }            
        }
        if (client){
            let type = form.type;
            if (type === this.CAR) cars = await this.createCar( form, returnObj );
            if (type === this.MORGAGE) morgage = await this.createMorgage( form, returnObj );
            if (type === this.PRAT) prati =await this.createPart( form, returnObj );
            if (type === this.DIRA) dira = await this.createDira( form, returnObj );
        }
        if (form.borrow.loanType !== undefined) loan = await this.createLoan( form, returnObj );

        product = await this.createProduct(client,secondClient, form.type, cars, morgage, prati, dira, form.loan,  loan, returnObj);

        return product;

    }
    // if client doesnt exist create one and mate if exist do nothing
    //create sub products and products
    async updateRecord (form, returnObj) {
        
        await this.updateClient(form);
        if (form.mate.cTaz1) await this.updateMate(form);
        let type = form.type;
        if (type === this.CAR) await this.UpdateCar( form );
        if (type === this.MORGAGE) await this.UpdateMorgage( form );
        // if (type === this.PRAT) prati =await this.UpdatePart( form, returnObj );
        // if (type === this.DIRA) dira = await this.UpdateDira( form, returnObj );
        
         if (form.borrow.loanType) await this.updateLoan( form );
         returnObj.msg.push('הפניה עודכנה בהצלחה');
         return true;


    }
    
}

module.exports = new newEntry();