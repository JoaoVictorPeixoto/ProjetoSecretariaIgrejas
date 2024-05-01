const db = require('./db');
class router {
    constructor(){

    }

    db = new db();

    async resolver(requisicao, params){
        if(requisicao){
            try {
                return this[requisicao](params);
            } catch (error) {
                console.log(error);
                return {
                    erro: true,
                    stack_erro: error,
                    mensagem: 'Falha na requisição',
                    codigo: 404
                };
            }
           
        }
        
    }

    async validaLogin(params){
        let usr_ident = params.usr_ident
            , usr_senha = params.usr_senha
        ;

        let retorno = {
            erro: false,
            mensagem: ''
        };

        try {
            let resultado_query = await this.db.select(`
                SELECT 
                    usr_id,
                    usr_nome
                FROM usuarios
                WHERE
                    usr_ident = '${usr_ident}'
                    AND usr_senha = '${usr_senha}'
            `);

            if(resultado_query.length){
                retorno.erro = false ;
                retorno.mensagem = `Bem-Vindo(a) ${resultado_query[0].usr_nome}`
            } else {
                retorno.erro = true;
                retorno.mensagem = 'Usuario ou senha invalidos!',
                retorn.codigo = 401
            }
            
            return retorno;

        } catch (error) {
            console.log(erro);
            return {
                erro: true,
                mensagem: 'Falha ao buscar usuario!',
            }
        }
        
    }

    async carregaCampos(params){
        let retorno = {
            erro: false,
            mensagem: ''
        }
        let pagina_aquivo;

        if(!params.pagina){
            retorno.erro = true;
            retorno.mensagem = 'Pagina não encontrada para recuperação de campos!';
            retorno.codigo = 400
        }

        let pagina = await this.__carrega_pagina(params.pagina);
        pagina.setup();
        retorno.campos = pagina.campos;

        return retorno;
    }

    async carregaButtons(params){
        let retorno = {
            erro: false,
            mensagem: ''
        }
        let pagina_aquivo;

        if(!params.pagina){
            retorno.erro = true;
            retorno.mensagem = 'Pagina não encontrada para recuperação de Botões!';
            retorno.codigo = 400;
        }


        let pagina = await this.__carrega_pagina(params.pagina);
        pagina.setup(params.acao);
        retorno.buttons = pagina.buttons;

        return retorno;
    }

    /**
     * Cadastra um novo membro
     * @param {*} params  - uma objeto contendo uma um objeto sql como propriedade que contem obrigatoriamente a seguinte estrutura
     *      sql : {
     *          fields: [...],
     *          values: [...],
     *          tabela: 'tabela x'
     *      }
     * @returns 
     */
    async manipulaMembro(params){

        // caso não exista os parametros obrigatorios, retorna um erro para o chamador.
        if(!params.pacote.sql){
            return {
                erro: true,
                mensagem: `Parametro 'sql' obrigatorio não preenchido!`,
                codigo: 400
            };
        } else {
            if(!params.pacote.sql.fields || !params.pacote.sql.values || !params.pacote.campos || !params.pacote.comando){
                return {
                    erro: true,
                    mensagem: 'Parametros [fields, values, campos, comando] obrigatorios não preenchidos!',
                    codigo: 400
                };
            }
        }  
    
        let pagina = await this.__carrega_pagina(params.pacote.pagina);

        // valida campos
        pagina.setup(params.pagina);
        let campos_verificados = await pagina.verify(params.pacote.campos);

        try {

            if(campos_verificados !== null){
                throw ''
            }
            
            let res;
            if (params.pacote.comando === 'insert') {
                res = await this.db.insert(params.pacote.sql.fields, params.pacote.sql.values, 'membros');
                
            } else if (params.pacote.comando === 'update') {

                if(!params.pacote.sql.chave_where || !params.pacote.id){
                    return {
                        erro: true,
                        mensagem: 'Parametros [chave_where, id] obrigatorios não preenchidos!',
                        codigo: 400
                    };
                }

                res = await this.db.update(params.pacote.sql.fields, params.pacote.sql.values, 'membros', params.pacote.sql.chave_where, params.pacote.id);
            }

            return res

        } catch (error) { 
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha ao Cadastrar Usuario',
                campos: campos_verificados
            }
        }
        
    }


    async __carrega_pagina(nome_pagina){
        let pagina_aquivo;

        try {
            pagina_aquivo = require(`../paginas/${nome_pagina}`);
        } catch (error) {
            
        }
        
        if(!pagina_aquivo){
            try {
                pagina_aquivo = require(`../paginas/genericas/${nome_pagina}`);
            } catch (error){
                console.log(error);
                return {
                    erro: true,
                    mensagem: 'Erro ao buscar pagina!',
                    codigo: 400
                }
            }
            
        }

        let pagina = new pagina_aquivo();
        return pagina;
    }

    /**
     * Busca registros de uma tabela. 
     * Aceita um entrada join e/ou where do tipo strig que será usado equivalentemente como join e where 
     * textual da query.
     */
    async buscaRegistros(params){
        if(!params.pacote.table){
            return {
                erro: true,
                mensagem: 'Tabela não identificada',
                codigo: 400
            }
        }

        try {
            let tabela = params.pacote.table
                , where = params.pacote.where ? params.pacote.where : ''
                , join = params.pacote.join ? params.pacote.join : ''
                , res = await this.db.select(`
                    SELECT * FROM ${tabela}
                    ${join}
                    ${where}
                `)
            ;

            return res;
        } catch (error){
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha interna ao buscar registros!'
            }
        }
        
    }
    
    async deletaRegistro(params){
        if(!params.pacote.tabela || !params.pacote.where){
            return {
                erro: true,
                mensagem: 'Parâmetro [tabela, where] obrigatorio faltante!',
                codigo: 400
            }
        }

        let tabela = params.pacote.tabela
            , where = params.pacote.where 
        ;

        try {
            
            return await this.db.delete(tabela, where);

        } catch (error) {
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha Interna ao deletar Registro!'
            }
        }
    }

    async desligaMembro(params) {
        if(!params.pacote.id){
            return {
                erro: true,
                mensagem: 'Parâmetro [id] obrigatorio faltante!',
                codigo: 400
            }
        }

        try {
            let fields = ['desmeb_motivo', 'desmeb_meb_id', 'desmeb_data']
                , values = [params.pacote.desmeb_motivo, params.pacote.id, params.pacote.desmeb_data]
                , res = await this.db.insert(fields, values, 'desligamento_membro');
            ;  

            return res;
        } catch (error) {
            console.log(error);
            return {
                erro: true,
                mensagem: 'Erro interno ao desligar membro!',
            }
        }
    }

    async editaRegistro(params) {
        if(!params.pacote.tabela || !params.pacote.chave_where || !params.pacote.fields || !params.pacote.values || !params.pacote.id){
            return {
                erro: true,
                mensagem: 'Parâmetro [tabela, where, fields, values, id] obrigatorio faltante!',
                codigo: 400
            }
        }

        try {
            let res = await this.db.update(params.pacote.fields, params.pacote.values, params.pacote.tabela, params.pacote.chave_where, params.pacote.id);

            return {
                erro: false,
                mensagem: 'Registro editado com sucesso!',
                retorno: res
            }
        } catch (error) {
            console.log(error);
            return {
                erro: true,
                mensagem: 'Erro interno ao editar registro!'
            }
        }
    }
}

module.exports = router;