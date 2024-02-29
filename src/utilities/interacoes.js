import alerta from '../components/alertas'
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
                    pacote: paramns
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            let resposta = await response.json();
            
            new alerta().emiteAlerta(resposta.mensagem, resposta.erro ? 'error' : 'success', 1500);

            return resposta;
            
        } catch (error) {
            console.log(error);
        }
    }

}

export default new interacoes;