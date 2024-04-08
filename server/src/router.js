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
        pagina.setup();
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
    async cadastrarMembro(paramns){

        // caso não exista os parametros obrigatorios, retorna um erro para o chamador.
        if(!paramns.pacote.sql){
            return {
                erro: true,
                mensagem: `Parametro 'sql' obrigatorio não preenchido!`
            };
        } else {
            if(!paramns.pacote.sql.fields || !paramns.pacote.sql.values || !paramns.pacote.campos){
                return {
                    erro: true,
                    mensagem: 'Parametros obrigatorios não preenchidos!'
                };
            }
        }  
    
        let pagina = await this.__carrega_pagina(paramns.pacote.pagina);
        // valida campos
        pagina.setup();
        let campos_verificados = await pagina.verify(paramns.pacote.campos);

        try {

            if(campos_verificados !== null){
                throw ''
            }

            let res = await this.db.insert(paramns.pacote.sql.fields, paramns.pacote.sql.values, 'membros');
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
}

module.exports = router;