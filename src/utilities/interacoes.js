class interacoes {
    
    /**
     * Faz uma interação com o servidor
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
            
            return resposta;
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    /**
     * Faz upload de um file, ou uma lista de files para o servidor.
     */
    async uploadFile(files) {
        try {
            let data = new FormData();
            data.append('file', files);

            let response = await fetch('http://localhost:3000/upload', {
                method: "POST",
                body: data,
                // headers: {
                //     "Content-type": "multipart/form-data"
                // }
            });

            let resposta = await response.json();
            
            return resposta;
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}

export default new interacoes;