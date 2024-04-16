<script setup>
    import ficha from '../components/ficha.vue';
    import navBar from '../components/navbar.vue';
    import {onMounted, ref, onBeforeRouteLeave} from 'vue';
    import alerta from "../components/alertas";
    import interacoes from "../utilities/interacoes";

    let meb_id = ''
        , ficha_componente = ref(null)
    ;

    /**
     * Quando a pagina for montada, recupera o ida do membro salvo. 
     * Logo apos remove o id do storege da sessão
     */
    onMounted(async () => {
        meb_id = sessionStorage.getItem('meb_id');
        
        // pagote de envio
        let pacote_envio = {
            id: meb_id,
            table: 'membros',
            chave: 'meb_id'
        };

        // busca os dados do mebro no serve
        let pacote_retorno = await interacoes.interage_server(pacote_envio, 'recuperaRegistro');
        
        if (!pacote_retorno.erro) {
            for (let i = 0; i < pacote_retorno.registro.length; i++) {
                const campo_serve = pacote_retorno.registro[i];

                for (let j = 0; j < ficha_componente.value.formulario_componente.campos.length; j++) {
                    let type = !ficha_componente.value.formulario_componente.campos[j]['select'] ? 'input' : 'select'
                        , id = ''
                    ;
                    
                    if(ficha_componente.value.formulario_componente.campos[j][type]){
                        id = ficha_componente.value.formulario_componente.campos[j][type].id;

                        // Caso o campo seja um campo de data, converte ele para um objeto data.
                        if(typeof(campo_serve[id]) === 'string' && id.includes('data')){
                            let data = new Date(campo_serve[id])
                                , ano = data.getFullYear()
                                , mes = data.getMonth() + 1
                                , dia = data.getDate()
                                , mes_string = mes < 10 ? '0' + mes : mes
                                , dia_string = dia < 10 ? '0' + dia : dia
                                , value = ano + '-' + mes_string + '-' + dia_string
                            ;
                            ficha_componente.value.formulario_componente.campos[j][type].value = value;
                        } else {
                            ficha_componente.value.formulario_componente.campos[j][type].value = campo_serve[id];
                        }
                    }
                    
                }
            }
        } else {
            new alerta().emiteAlerta(pacote_retorno.mensagem, "error", 2000);
        }
        

    })

</script>

<template>
    <navBar />
    <ficha  ref="ficha_componente" enviar_id="true"/>
    
</template>

<style>

</style>