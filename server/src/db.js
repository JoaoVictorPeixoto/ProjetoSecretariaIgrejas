const mysql = require('mysql2/promise');
class db {

    constructor(){
        
    };

    async select(sql) {
        try {
            const conection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_DATABASER,
                password: process.env.DB_PASSWORD
            });
            
            const res = await conection.query(sql);
            return res[0];
            
        } catch (error) {
            return error;
        }
    }

    async insert(sql){
        let fields = sql.fields
            , values = sql.values
            , table = sql.table
        ;
        
        // Caso qualquer parametro obrigatorio esteja faltante, retorna um erro.
        if(!fields || !values || !table){
            return {
                erro: true,
                mensagem: 'Parametros obrigatorios faltantes!'
            }
        }

        // Cria lista de fields textual
        let fields_textal = ''
        fields.forEach(field => {
            fields_textal += "'" + field + "',";
        });

        fields_textal = fields_textal.slice(0, fields_textal.length-1);

        // cria lista de value textual
        for (let i = 0; i < array.length; i++) {
            
            
        }

        try {
            const conection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_DATABASER,
                password: process.env.DB_PASSWORD
            });
            
            const res = await conection.query(`
                INSERT INTO ${table} (${fields_textal})
                VALUE
                ()

            `);
            return res[0];
            
        } catch (error) {
            return error;
        }


    }
}

module.exports = db
