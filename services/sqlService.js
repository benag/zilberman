
const sql = require('mssql');
var nexmo = require('./nexmo');

class sqlService {
    constructor() {
        if (sqlService.singelton) return sqlService.singelton;
        this.dbconfig = {
            user: 'lead_server',
            password: 'jo98^Hu%',
            server: '62.219.187.1', // You can use 'localhost\\instance' to connect to named instance
            port: 3306,
            database: 'ZIL_LEADS'

        };

        sql.on('error', err => {
            console.log(err);
        });

        sqlService.singleton = this;
        return sqlService.singleton;

    }
    //async init () {
    //    let pool = await sql.connect(this.dbconfig);
    //    return pool;
    //}
    async query ( statement )  {
        try {
            console.log(statement);
            if (!this.pool){
                sql.close();
                this.pool = await sql.connect(this.dbconfig);
            } 
            let result1 = await this.pool.request()
                .query(statement);

            console.log(result1);
            return result1;

        } catch (err) {
            console.log(err);
            nexmo.sms('0526749884', JSON.stringify(err) );
            throw err;
            // ... error checks
        }
    }
}

module.exports = sqlService;