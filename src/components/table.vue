<script setup>

    import {onMounted, ref} from 'vue'
    import interacoes from "../utilities/interacoes";
    import alerta from "./alertas";
    import {useRouter, onBeforeRouteLeave} from 'vue-router';

    let tabela = ref([])
        , cabecario = ref([])
        , style_col = 'scope="row"'
        , meb_id = ''
    ;

    // instancia do router
    const router = useRouter();

    /**
     * Antes de mudarmos de pagisn, caso o to seja a pagina de edição de membro, salvo temporariamente o id
     * do membro para que suas informações sejam recuperadas.
     */
    onBeforeRouteLeave (async (to, from) => {
        if(to.name === 'editar_membro'){
            sessionStorage.setItem('meb_id', meb_id);
        }
    });

    //#region :: Life Hooks

    /**
    * Carrega Linhas e colunas da tabela
    */
    onMounted(async () => {
        [cabecario.value, tabela.value] = await buscaColunasLinhas();
    });

    //#endregion

    //#region :: Metodos

    async function buscaColunasLinhas(){
        let res = await interacoes.interage_server({table: 'membros'}, 'buscaRegistros');

        if(res.erro){
            new alerta().emiteAlerta(res.mensagem, "error", 2000);
            return [];

        } else {

            // Ajustas datas
            for (let i = 0; i < res.length; i++) {
                res[i].meb_data_nasc = new Date(res[i].meb_data_nasc).toLocaleDateString();
                res[i].meb_data_batismo = new Date(res[i].meb_data_batismo).toLocaleDateString();
                
            }

            return [['Nome', 'Data de Nascimento', 'Data de Batismo', 'Número de Rol', '', ''],res];
        }

    }

    function editarMembro(membro, index_linha){
        console.log('Clicou na linha ' + index_linha + ' - Nome: ' + membro.meb_nome);
        meb_id = membro.meb_id;
        router.push('editarMembro');
    }

    function desligarMembro(membro, index_linha){
        console.log('Não desligo não!');
    }

    //#endregion
    
</script>

<template>
    <div>
        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col" v-for="(celula, index) in cabecario" :key="index">{{celula}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(membro, index_linha) in tabela" :key="index_linha">
                    <td :scope="index_linha === 0 ? 'row' : ''">{{membro.meb_nome}}</td>
                    <td>{{membro.meb_data_nasc}}</td>
                    <td>{{membro.meb_data_batismo}}</td>
                    <td>{{membro.meb_rol}}</td>
                    <td @click="editarMembro(membro, index_linha)" class="editar">Editar</td>
                    <td @click="desligarMembro(membro, index_linha)" class="desligar">Desligar</td>
                </tr> 
            </tbody>
        </table>
    </div>
</template>

<style>
.editar:hover{
    background-color: rgb(115, 180, 255) !important;
}

.editar{
    text-align:     center;
    font-weight:    bolder;
    background-color: rgb(216, 235, 255) !important;
    cursor: pointer;
}

.desligar:hover{
    background-color: rgb(255, 91, 91) !important;
}

.desligar{
    text-align:     center;
    font-weight:    bolder;
    background-color: rgb(255, 216, 216) !important;
    cursor: pointer;
}

</style>