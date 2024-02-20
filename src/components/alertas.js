import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

class alerta {
    constructor(){}
    
    /**
     * Emite um alerta com uma mensagem.
     * @param {*} mensagem 
     * @param {*} erro 
     */
    emiteAlerta(mensagem, tipo_alerta, tempo){
        toast[tipo_alerta](mensagem, {
            autoClose: tempo,
            position: toast.POSITION.BOTTOM_RIGHT,
         })
    }

    /**
     * Emite um alerta de carregamento;
     * @param {*} mensagem 
     * @returns 
     */
    emiteCarregamentoAlerta(mensagem){
        let id_alerta = toast.loading(mensagem);

        return id_alerta
    }

    atualizaAlertaCarregamento(id, mensagem, autClose, type_alerta){
        toast.update(id, {
            render: mensagem,
            autoClose: autClose,
            type: type_alerta,
            isLoading: false
        });
    }
    
}

export default alerta;