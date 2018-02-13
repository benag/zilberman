

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

    async createClient(client) {

        let cTaz1 = this.wrapVal(form.taz) , cTaz2 = this.wrapVal(form.mate.taz) , cName = this.wrapVal( form.firstName ) , cFamily = this.wrapVal( form.lastName ) , cGender = this.wrapVal (form.gender),
            cMobile = this.wrapVal(form.mobile) , cPhone = this.wrapVal(form.phone), cEmail = this.wrapVal(form.email), cBDate = this.wrapDate(form.birthdate) ,
            cTazDate= this.wrapDate (form.iddate ), cRemark = this.wrapVal(''), cSmoke = 0 , cQuitSmokeDate = this.wrapDate(form.smokingDate);

        if (cTaz1 && ( cTaz2 === null || cTaz2 === undefined) ) cTaz2 = cTaz1;

        let insert = `INSERT INTO tClients (cTaz1, cTaz2, cName, cFamily, cGender, cMobile, cPhone, cEmail, cBDate, cTazDate,cRemark, cSmoke, cQuitSmokeDate)
                VALUES ( ${cTaz1} , ${cTaz2}, ${cName}, ${cFamily}, ${cGender} , ${cMobile},${cPhone}, ${cEmail}, ${cBDate}, ${cTazDate}, ${cRemark}, 1, ${cQuitSmokeDate} )`;

        let newClient = await this.sql.query(insert);
        return cTaz1;
    }

    async updateClient (client, form) {

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

    async createOrUpdateCar(form, returnObj) {


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
        let newCar;
        if (car){
            newCar = car[0];
        }else{
            newCar = null;
        }
        type = this.convertType(type);
        let insert = `INSERT INTO tProducts (pID, pCli1, pCli2, pType, propertyID, loanID, pratInsID, carInsID)
                VALUES (${pid},${client},${client},${type}, ${morgage},${loan},${prati},${newCar} )`;
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

    async getClients(id) {
        let query;
        if (id) query = 'SELECT * FROM tClients WHERE cTaz1='+id;
        if (!id) query = 'SELECT * FROM tClients';
        let clients = await this.sql.query(query);
        return clients;
    }

    async updateClietnAndMate(form){
        if (form.id){
            // the original taz has being changed update according to old ID
            
        }else{
            // find if taz already exist if yes update
            let client = await this.sql.query("SELECT * FROM tClients WHERE cTaz2 = " + form.client.taz);

        }

        
    }
    async createOrUpdateClient (clientForm, returnObj) {
        returnObj.msg.push('לקוח עודכן במערכת');
        let client = null;
        if (clientForm.id){
            // taz was changed update according to old id
            client = await this.updateClient(clientForm, clientForm.id);
        }else{
            client = await this.sql.query("SELECT * FROM tClients WHERE cTaz2 = " + clientForm.taz);
            if ( client && client.recordset.length > 0 ) { // client exist in the system update
                client = await this.updateClient(clientForm, false);        
            }else{// ccreate new client
                client = await this.createClient(clientForm);
            } 

        }
    }

    async createOrUpdateMate () {

    }
    async save (form) {

        let returnObj = {status:true, msg:[]};
        let client = null,secondClient = null, cars = null, morgage = null, prati = null, dira = null, loan = null;
        try{
            if (!form.client.taz) {
                returnObj.status = false;
                returnObj.msg.push('חסר תעודת זהות');
                return returnObj;
            }
            client = this.createOrUpdateClient(form.client, returnObj);
            secondClient =this.createOrUpdateClient(form.mate, returnObj);
            
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