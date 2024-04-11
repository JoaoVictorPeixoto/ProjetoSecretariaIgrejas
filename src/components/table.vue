<script setup>

    import {onMounted, ref} from 'vue'
    import interacoes from "../utilities/interacoes";
    import alerta from "../components/alertas";

    let tabela = ref([])
        , cabecario = ref([])
        , style_col = 'scope="row"'
    ;

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
                
            }

            return [['Nome', 'Idade'],res];
        }

    }

    //#endregion
    
</script>

<template>
    <div>
        <table class="table table-striped table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col" v-for="(celula, index) in cabecario" :key="index">{{celula}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index_linha) in tabela" :key="index_linha">
                    <td :scope="index_linha === 0 ? 'row' : ''">{{user.meb_nome}}</td>
                    <td>{{user.meb_data_nasc}}</td>
                </tr> 
            </tbody>
        </table>
    </div>

</template>

<style>

</style>