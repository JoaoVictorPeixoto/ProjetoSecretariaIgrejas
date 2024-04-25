<script setup>
    import formulario from "../components/formulario_generico.vue";
    import navBar from '../components/navbar.vue';
    import {ref, onMounted} from 'vue';
    import alerta from "../components/alertas";
    import interacoes from "../utilities/interacoes";
    import {useRouter} from 'vue-router';
    import style from "../styles/styles";
    import "../styles/formularios.css";

    let furmulario_style = style.class_formulario + " formulario"
        , meb_nome = ref('')
        , desmeb_motivo = ref('')
        , meb_id = ''
    ;

    // instancia do router
    const router = useRouter();

    onMounted(async () => {
        meb_nome.value = sessionStorage.getItem('meb_nome');
        meb_id = sessionStorage.getItem('meb_id');
    });

    async function clickSubmit() {
        // pacote de envio
        let pacote = {
            id: meb_id,
            desmeb_motivo: desmeb_motivo.value
        };

        let res = await interacoes.interage_server(pacote, 'desligaMembro');

        if (res.erro) {
            new alerta().emiteAlerta(res.mensagem, "error", 2000);
        } else {
            
            router.push('listaMembros').then(() => {
                new alerta().emiteAlerta("Membro Desligado com Sucesso!", "success", 2000);
            })
            
        }
        
    }

    function voltar(){
        router.push('listaMembros');
    }


</script>

<template>
    <navBar />
    <div :class="furmulario_style">
        <p class="fs-2 text-center w-100">Confirma desligamento do Membro - {{ meb_nome }}</p>

        <textarea class="form-control-lg my-4 w-100" id="motivo" rows="10" placeholder="Motivo" v-model="desmeb_motivo"></textarea >

        <div class="pai container-xl w-100">
            <button type="button" class="btn btn-success" @click="clickSubmit">Confirmar</button>
            <button type="button" class="btn btn-danger mx-2" @click="voltar">Cancelar</button>
        </div>
        
    </div>
  </template>

<style>
.pai {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>