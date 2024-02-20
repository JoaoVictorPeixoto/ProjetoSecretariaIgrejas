const mysql = require('mysql2/promise');
class db {

    constructor(){
        
    };

    async select(sql) {
        try {
            const conection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                database: 'igrejas',
                password: 'MASTERKEY@23'
            });
            
            const res = await conection.query(sql);
            return res[0];
            
        } catch (error) {
            return error;
        }
    }

    async insert(sql){
        
    }
}

module.exports = db
