class interacoes {
    
    /**
     * Cadastra um novo membro no sistema
     */
    async interage_server(paramns, interacao){
        try {
            let response = await fetch('http://localhost:3000/interacao', {
                method: "POST",
                body: JSON.stringify({
                    interacao: interacao,
                    paramns
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            let resposta = await response.json();
            
            console.log(resposta.mensagem);

            return resposta;
            
        } catch (error) {
            console.log(error);
        }
    }

}

export default new interacoes;