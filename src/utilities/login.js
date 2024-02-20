class login {

    usr_ident = '';
    usr_senha = '';
    
    /**
     * Faz requisição ao serve para acessar o sistema.
     * @param {*} usr_ident 
     * @param {*} usr_senha 
     */
    async entrar(usr_ident, usr_senha){
        
        if(!usr_ident || !usr_senha){
            return {
                erro: true,
                mensagem: 'Usuario e senha obrigatorio!'
            };
        }

        try {
            let response = await fetch('http://localhost:3000/interacao', {
                method: "POST",
                body: JSON.stringify({
                    interacao: 'validaLogin',
                    usr_ident: usr_ident,
                    usr_senha: usr_senha
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            let resposta = await response.json();

            return resposta;
       
        } catch (error) {
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha ao efetuar login!'
            };
        }
    }


}

export default new login;