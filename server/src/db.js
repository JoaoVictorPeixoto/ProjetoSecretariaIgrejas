const mysql = require('mysql2/promise');
const utils = require('./utils');
const config = require('../configDB.js');
class db {

    constructor(){
        
    };

    async select(sql) {
        try {
            const conection = await mysql.createConnection({
                host: config.HOST,
                user: config.USER,
                database: config.DATABASE,
                password: config.PASSWORD
            });
            
            const res = await conection.query(sql);
            return res[0];
            
        } catch (error) {
            return error;
        }
    }

    async insert(fields, values, tabela){
        // Caso qualquer parametro obrigatorio esteja faltante, retorna um erro.
        if(!fields || !values || !tabela){
            return {
                erro: true,
                mensagem: 'Parametros obrigatorios faltantes!'
            }
        }

        // Cria lista de fields textual
        let fields_textal = '';
        fields.forEach(field => {
            fields_textal += field + ", ";
        });

        fields_textal = fields_textal.slice(0, fields_textal.length-2);

        // cria lista de value textual
        let values_textual = '';
        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            if(utils._.isNumber(value) ||  utils._.isBoolean(value) || utils._.isNull(value)){
                values_textual += value + ', ';
            } else if (utils._.isDate(value) || utils._.isString(value)) {
                values_textual += "'"+ value + "', ";
            }
            
        }

        values_textual = values_textual.slice(0, values_textual.length-2);

        try {
            const conection = await mysql.createConnection({
                host: config.HOST,
                user: config.USER,
                database: config.DATABASE,
                password: config.PASSWORD
            });
            
            const res = await conection.query(`
                INSERT INTO ${tabela} (${fields_textal})
                VALUE
                (${values_textual})
            `);

            return {
                erro: false,
                mensagem: 'Usuario cadastrado com sucesso!'
            }
            
        } catch (error) {
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha ao cadastrar novo membro!'
            }
        }


    }
}

module.exports = db
