
"use strict"

const sql = require('mssql');

let instance = null;

class SQL {

    pool ={};
    constructor(user,password,server,port, database) {

        if(!instance){
            const dbconfig = {
                user: user,
                password: password,
                server: server, 
                port: port,
                database: database

            };
            connect = async function () {
                try {
                    this.pool = await sql.connect(dbconfig)
                    let result1 = await pool.request()
                        .query('select * from LeadsClient')
                        
                    console.log(result1)
                
                    } catch (err) {
                        console.log(err);
                    // ... error checks
                }
            };
            connect();
            sql.on('error', err => {
                console.log(err);// ... error handler
            });

            instance = this;
        }
    return instance;     
   }
}


module.exports = SQL;