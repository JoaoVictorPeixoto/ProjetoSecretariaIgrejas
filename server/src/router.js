const db = require('./db');
class router {
    constructor(){

    }

    db = new db();

    async resolver(requisicao, paramns){
        if(requisicao){
            try {
                return this[requisicao](paramns);
            } catch (error) {
                console.log(error);
                return {
                    erro: true,
                    stack_erro: error,
                    mensagem: 'Falha na requisição'
                };
            }
           
        }
        
    }

    async validaLogin(paramns){
        let usr_ident = paramns.usr_ident
            , usr_senha = paramns.usr_senha
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
                retorno.mensagem = 'Usuario ou senha invalidos!'
            }
            
            return retorno;

        } catch (error) {
            console.log(erro);
            return {
                erro: true,
                mensagem: 'Falha ao buscar usuario!'
            }
        }
        
    }

    async carregaCampos(paramns){
        let retorno = {
            erro: false,
            mensagem: ''
        }
        let pagina_aquivo;

        if(!paramns.pagina){
            retorno.erro = true,
            retorno.mensagem = 'Pagina não encontrada para recuperação de campos!'
        }

        let pagina = await this.__carrega_pagina(paramns.pagina);
        pagina.setup();
        retorno.campos = pagina.campos;

        return retorno;
    }

    async carregaButtons(paramns){
        let retorno = {
            erro: false,
            mensagem: ''
        }
        let pagina_aquivo;

        if(!paramns.pagina){
            retorno.erro = true,
            retorno.mensagem = 'Pagina não encontrada para recuperação de Botões!'
        }


        let pagina = await this.__carrega_pagina(paramns.pagina);
        pagina.setup(paramns.acao);
        retorno.buttons = pagina.buttons;

        return retorno;
    }

    /**
     * Cadastra um novo membro
     * @param {*} paramns  - uma objeto contendo uma um objeto sql como propriedade que contem obrigatoriamente a seguinte estrutura
     *      sql : {
     *          fields: [...],
     *          values: [...],
     *          tabela: 'tabela x'
     *      }
     * @returns 
     */
    async manipulaMembro(paramns){

        // caso não exista os parametros obrigatorios, retorna um erro para o chamador.
        if(!paramns.pacote.sql){
            return {
                erro: true,
                mensagem: `Parametro 'sql' obrigatorio não preenchido!`
            };
        } else {
            if(!paramns.pacote.sql.fields || !paramns.pacote.sql.values || !paramns.pacote.campos || !paramns.pacote.comando){
                return {
                    erro: true,
                    mensagem: 'Parametros obrigatorios não preenchidos!'
                };
            }
        }  
    
        let pagina = await this.__carrega_pagina(paramns.pacote.pagina);

        // valida campos
        pagina.setup(paramns.pagina);
        let campos_verificados = await pagina.verify(paramns.pacote.campos);

        try {

            if(campos_verificados !== null){
                throw ''
            }
            
            let res;
            if (paramns.pacote.comando === 'insert') {
                res = await this.db.insert(paramns.pacote.sql.fields, paramns.pacote.sql.values, 'membros');
                
            } else if (paramns.pacote.comando === 'update') {

                if(!paramns.pacote.sql.chave_where || !paramns.pacote.id){
                    return {
                        erro: true,
                        mensagem: 'Parametros obrigatorios não preenchidos!'
                    };
                }

                res = await this.db.update(paramns.pacote.sql.fields, paramns.pacote.sql.values, 'membros', paramns.pacote.sql.chave_where, paramns.pacote.id);
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
            pagina_aquivo = require(`../paginas/genericas/${nome_pagina}`);
        }

        let pagina = new pagina_aquivo();
        return pagina;
    }

    /**
     * Busca todos os registros de uma tabela especifica
     */
    async buscaRegistros(paramns){
        if(!paramns.pacote.table){
            return {
                erro: true,
                mensagem: 'Tabela não identificada'
            }
        }

        try {
            let tabela = paramns.pacote.table
                , res = await this.db.select(`
                    SELECT * FROM ${tabela}
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

    async recuperaRegistro(paramns){
        if(!paramns.pacote.id || !paramns.pacote.table || !paramns.pacote.chave){
            return {
                erro: true,
                mensagem: 'Parametros obrigatorios não encontrados!'
            };
        }

        try {
            let id = paramns.pacote.id
                , tabela = paramns.pacote.table
                , chave = paramns.pacote.chave
            ;

            let res = await this.db.select(`
                select * from ${tabela}
                where ${chave} = ${id}
            `);

            return {
                erro: false,
                mensagem: '',
                registro: res
            };

        } catch (error) {
            console.log(error);
            return {
                erro: true,
                mensagem: 'Erro interno na busca de registro!'
            };
        }
    }

}

module.exports = router;