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

            conection.end();

            return res[0];
            
        } catch (error) {
            conection.end();
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
            
            conection.end();

            return {
                erro: false,
                mensagem: 'Operação realizada com sucesso!'
            }
            
        } catch (error) {
            conection.end();
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha na operação!'
            }
        }


    }

    async update(fields, values, tabela, chave_where, id_where){
        // Caso qualquer parametro obrigatorio esteja faltante, retorna um erro.
        if(!fields || !values || !tabela || !chave_where || !id_where){
            return {
                erro: true,
                mensagem: 'Parametros obrigatorios faltantes!'
            }
        }

        // cria lista de set textual
        let set_textual = '';
        for (let i = 0; i < values.length; i++) {
            let value = values[i]
                , field = fields[i]
            ;
            if(utils._.isNumber(value) ||  utils._.isBoolean(value) || utils._.isNull(value)){
                set_textual += field + ' = ' + value + ', ';
            } else if (utils._.isDate(value) || utils._.isString(value)) {
                set_textual += field + ' = ' + "'" + value + "', ";
            }
            
        }

        set_textual = set_textual.slice(0, set_textual.length-2);

        // criar where textual
        let where = `WHERE ${chave_where} = ${id_where}`;

        try {
            const conection = await mysql.createConnection({
                host: config.HOST,
                user: config.USER,
                database: config.DATABASE,
                password: config.PASSWORD
            });
            
            const res = await conection.query(`
                UPDATE ${tabela} 
                SET ${set_textual}
                ${where}
            `);

            conection.end();
            return {
                erro: false,
                mensagem: 'Operação realizada com sucesso!'
            }
            
        } catch (error) {
            conection.end();
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha na operação!'
            }
        }


    }

    async delete(tabela, where){
        // Caso qualquer parametro obrigatorio esteja faltante, retorna um erro.
        if(!tabela || !where){
            return {
                erro: true,
                mensagem: 'Parametros obrigatorios faltantes!'
            }
        }

        try {
            const conection = await mysql.createConnection({
                host: config.HOST,
                user: config.USER,
                database: config.DATABASE,
                password: config.PASSWORD
            });
            
            const res = await conection.query(`
                DELETE FROM ${tabela} 
                WHERE ${where}
            `);

            conection.end();
            return {
                erro: false,
                mensagem: 'Delete realizado com sucesso!'
            }
            
        } catch (error) {
            conection.end();
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha na operação!'
            }
        }
    }
}

module.exports = db
