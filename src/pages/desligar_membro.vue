<script setup>
    import inputExt from "../components/input.vue";
    import navBar from '../components/navbar.vue';
    import {ref, onMounted} from 'vue';
    import alerta from "../components/alertas";
    import interacoes from "../utilities/interacoes";
    import {useRouter, onBeforeRouteLeave} from 'vue-router'
    import style from "../styles/styles";
    import "../styles/formularios.css";

    let furmulario_style = style.class_formulario + " formulario"
        , meb_nome = ref('')
        , desmeb_motivo = ref('')
        , desmeb_data = ref()
        , meb_id = ''
        , editar = false
    ;

    // instancia do router
    const router = useRouter();


    onBeforeRouteLeave (async (to, from) => {
        if (editar) {
            sessionStorage.setItem('filtro', 'membros_desligados');
        }

        sessionStorage.removeItem('meb_id');
        sessionStorage.removeItem('meb_nome');
        sessionStorage.removeItem('editar');
    });


    onMounted(async () => {
        meb_nome.value = sessionStorage.getItem('meb_nome');
        meb_id = sessionStorage.getItem('meb_id');
        editar = sessionStorage.getItem('editar');

        let pacote = {
            table: 'desligamento_membro',
            where: `WHERE desmeb_meb_id = ${meb_id}`
        }
        if (editar) {
            let res = await interacoes.interage_server(pacote, 'buscaRegistros');

            if (!res.erro) {
                if (res[0].desmeb_data !== null ){
                    let data = new Date(res[0].desmeb_data)
                        , ano = data.getFullYear()
                        , mes = data.getMonth() + 1
                        , dia = data.getDate()
                        , mes_string = mes < 10 ? '0' + mes : mes
                        , dia_string = dia < 10 ? '0' + dia : dia
                        , value = ano + '-' + mes_string + '-' + dia_string
                    ;
                    desmeb_data.value = value;
                } else {
                    desmeb_data.value = '';
                }
                
                desmeb_motivo.value =  res[0].desmeb_motivo;
            }
        }
    });

    async function clickSubmit() {

        if (editar) {
            let pacote = {
                tabela: 'desligamento_membro',
                chave_where: 'desmeb_meb_id',
                id: meb_id,
                fields: ['desmeb_data', 'desmeb_motivo'],
                values: [desmeb_data.value || null, desmeb_motivo.value || null]
            }

            let res = await interacoes.interage_server(pacote, 'editaRegistro');

            if (res.erro) {
                new alerta().emiteAlerta(res.mensagem, "error", 2000);
            } else {
                router.push('listaMembros').then(() => {
                    new alerta().emiteAlerta("Desligamento editado com sucesso!", "success", 2000);
                })
            }

        } else {
            // pacote de envio
            let pacote = {
                id: meb_id,
                desmeb_motivo: desmeb_motivo.value || null,
                desmeb_data: desmeb_data.value || null
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
    }

    function voltar(){
        router.push('listaMembros');
    }


</script>

<template>
    <navBar />
    <div :class="furmulario_style">
        <p class="fs-2 text-center w-100">Confirma desligamento do Membro - {{ meb_nome }}</p>

        <div class="row">
            <div class="col-4">
                <inputExt  
                    label="Data de Desligamento"
                    type="date"
                    input_id="desmeb_data"
                    v-model="desmeb_data"
                />
            </div>

            <div class="col-12">
                <textarea class="form-control-lg my-4 w-100" id="motivo" rows="10" placeholder="Motivo" v-model="desmeb_motivo"></textarea >
            </div>
            
        </div>
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