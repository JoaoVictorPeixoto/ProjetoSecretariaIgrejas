class carregamentoPaginas {
    constructor(){

    }

    async buscaInfoPag(pagina, interacao, busca){
        try {
            let response = await fetch('http://localhost:3000/interacao', {
                method: "POST",
                body: JSON.stringify({
                    interacao: interacao,
                    pagina: pagina,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            let resposta = await response.json();

            return resposta[busca];
       
        } catch (error) {
            console.log(error);
            return {
                erro: true,
                mensagem: 'Falha ao Comunicar-se com o servidor!'
            };
        }
    }

}

export default carregamentoPaginas;