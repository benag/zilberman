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
            database: 'ZIL_LEADS',
            options: {
                encrypt: true // Use this if you're on Windows Azure
            }

        };

        sql.on('error', err => {
            console.log(err);
        });

        sqlService.singleton = this;
        return sqlService.singleton;

    }

    // async query(statement){
    //     let that = this;
    //     return new Promise(function (fulfill, reject){
    //         sql.connect(that.dbconfig, err => {

    //             new sql.Request().query(statement, (err, result) => {
    //                 fulfill(result);
    //             })
    //         })
    //         sql.on('error', err => {
    //             reject(err);
    //         })
    //     })
        

    // }

    // async query(statement) {
    //     var connection = new Connection(this.dbconfig);
    //     return new Promise((fulfill, reject) => {
    //         connection.on('connect', function(err) {
    //             request = new Request("select 42, 'hello world'", function(err, rowCount) {
    //                 if (err) {
    //                   console.log(err);
    //                 } else {
    //                   console.log(rowCount + ' rows');
    //                 }
    //               });
          
    //         })
    //     })
    // }

    async query(statement) {
        console.log(statement);
        return new Promise((fulfill, reject) => {
            new sql.ConnectionPool(this.dbconfig).connect().then(pool => {
                return pool.request().query(statement)
                }).then(result => {
                  fulfill(result);
                  sql.close();
                }).catch(err => {
                  console.log(err);  
                  sql.close();
                }).catch((err)=> {
                    console.log(err);
                })
        })        
    }

    // async query(statement) {
    //     try {
    //         console.log(statement);


    //         if (!this.pool) {
    //             sql.close();
    //             this.pool = await sql.connect(this.dbconfig);
    //         }
    //         // this.pool.connect(err => {
    //         //     console.log(err);
    //         // })
    //         let request = await this.pool.request();
    //         // if (!request.connectionPool.domain) request = await this.pool.request();
    //         console.log(request);
    //         let result1;
    //         // result1 = request.query(statement);
    //         // console.log(result1);
    //         // return result1;
    //         return new Promise((fulfill, reject) => {
    //             request.query(statement)
    //             .then( (result) => {
    //                 return fulfill(result);
    //             }).catch((err)=>{
    //                 console.log(err);
    //             })
                
    //         })
    //         // return new Promise((fulfill, reject) => {
    //         //     setTimeout(async () => {
    //         //         result1 = await request.query(statement);
    //         //         console.log(result1);
    //         //         return fulfill(result1);
    //         //     }, 100)
    //         // });
            

            

    //     } catch (err) {
    //         console.log(err);
    //         nexmo.sms('0526749884', JSON.stringify(err));
    //         throw err;
    //         // ... error checks
    //     }
    // }
}

module.exports = sqlService;