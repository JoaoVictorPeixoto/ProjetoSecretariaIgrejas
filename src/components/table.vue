<script setup>

    import {onMounted, ref, reactive} from 'vue'
    import interacoes from "../utilities/interacoes";
    import alerta from "./alertas";
    import {useRouter, onBeforeRouteLeave} from 'vue-router';
    import selectExt from './select.vue'

    let tabela = reactive(ref([]))
        , cabecario = reactive(ref([]))
        , style_col = 'scope="row"'
        , meb = {}
        , desligar = ref(false)
        , editar = ref(false)
        , data_desligamento = ref(false)
        , religar = ref(false)
        , ultimo_filtro_tipo = ''
        , opcao_filtro = ref('membros')
    ;

    let options = [
    {
        id: 'membros',
        value: 'Membros',
        selected: true,
    },
    {
        id: 'membros_desligados',
        value: 'Desligados'
    },
    {
        id: 'membros_falecidos',
        value: 'Falecidos',
        disabled: true
    },
];

    // instancia do router
    const router = useRouter();

    //#region :: Life Hooks

    /**
    * Carrega Linhas e colunas da tabela
    */
    onMounted(async () => {
        let filtro = sessionStorage.getItem('filtro') || 'membros';

        opcao_filtro.value = filtro;
        [cabecario.value, tabela.value] = await buscaColunasLinhas(filtro);

        sessionStorage.removeItem('filtro');
    });

    //#endregion

    //#region :: Metodos

    async function buscaColunasLinhas(tipo_filtro){
        let where = defineWhere(tipo_filtro)
            , join = defineJoin(tipo_filtro)
            , parametros_sql = {
                table: 'membros',
                join: join,
                where: where
            }
        ;
        
        let res = await interacoes.interage_server(
            parametros_sql,
            'buscaRegistros'
        );

        if(res.erro){
            new alerta().emiteAlerta(res.mensagem, "error", 2000);
            return [];

        } else {

            // Ajustas datas
            for (let i = 0; i < res.length; i++) {
                res[i].meb_data_nasc = new Date(res[i].meb_data_nasc).toLocaleDateString();
                res[i].meb_data_batismo = new Date(res[i].meb_data_batismo).toLocaleDateString();
                res[i].desmeb_data = res[i].desmeb_data ? new Date(res[i].desmeb_data).toLocaleDateString() : ''
                
            }
            
            let cabecario = defineCabecario(tipo_filtro);
            return [cabecario, res];
        }

    }

    function editarMembro(membro, index_linha){
        meb = membro;
        sessionStorage.setItem('meb_id', meb.meb_id);
        sessionStorage.setItem('meb_nome', meb.meb_nome);
        sessionStorage.setItem('editar', true);

        let pagina = '';
        if (!religar.value) {
            pagina = 'editarMembro';
        } else {
            pagina = 'desligarMembro';
        }

        router.push(pagina);
    }

    async function desligarMembro(membro, index_linha){
        meb = membro;
        sessionStorage.setItem('meb_id', meb.meb_id);
        sessionStorage.setItem('meb_nome', meb.meb_nome);

        router.push('desligarMembro');
        
    }

    async function religarMembro(membro, index_linha){
        meb = membro;
        let pacote = {
            tabela: 'desligamento_membro',
            where: `desmeb_meb_id = ${meb.meb_id}`
        };
        let res = await interacoes.interage_server(pacote, 'deletaRegistro');
        
        if (res.erro) {
            new alerta().emiteAlerta(res.mensagem, "error", 2000);
        } else {
            new alerta().emiteAlerta("Membro Religado com Sucesso!", "success", 2000);
            [cabecario.value, tabela.value] = await buscaColunasLinhas(ultimo_filtro_tipo);
        }
    }

    async function FiltraLista(campo) {
        ultimo_filtro_tipo = campo.value;
        [cabecario.value, tabela.value] = await buscaColunasLinhas(ultimo_filtro_tipo);
    }

    //#region :: Regras de Negocio

    function defineWhere(tipo_filtro){
        let where = '';
        switch (tipo_filtro) {
            case 'membros':
                where = 'WHERE desmeb_id IS NULL';
            break;
            case 'membros_desligados':
                where = 'WHERE desmeb_id IS NOT NULL';
            break;
            case 'membros_falecidos':
            break;
        }

        return where;
    }

    function defineJoin(tipo_filtro){
        let join = '';
        switch (tipo_filtro) {
            case 'membros':
            case 'membros_desligados':
                join = 'LEFT JOIN desligamento_membro ON desmeb_meb_id = meb_id';
            break;
            case 'membros_falecidos':
            break;
        }

        return join;
    }

    function defineCabecario(tipo_filtro){
        let cabecario = ['Nome', 'Data de Nascimento', 'Data de Batismo', 'Número de Rol', '', ''];
        switch (tipo_filtro) {
            case 'membros':
                editar.value = true;
                desligar.value = true;
                religar.value = false;
                data_desligamento.value = false;
            break;
            case 'membros_desligados':
                cabecario.splice(4, 0, 'Data de Desligamento');
                editar.value = true;
                desligar.value = false;
                religar.value = true;
                data_desligamento.value = true;
            break;
            case 'membros_falecidos':
                cabecario.pop();
                cabecario.pop();
                editar.value = false;
                desligar.value = false;
                religar.value = false;
                data_desligamento.value = false;
            break;
        }

        return cabecario;
    }

    //#endregion

    //#endregion

</script>

<template>
    <div>
        <div class="row">
            <div class="col-3 mb-2">
                <selectExt 
                    label="Filtro de Membros" 
                    :options="options" 
                    @updateValue="FiltraLista"
                    no_change_mounted=true
                    v-model="opcao_filtro"
                />
            </div>
        </div>
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
                    <template v-if="data_desligamento">
                        <td>{{membro.desmeb_data}}</td>
                    </template > 
                    <template v-if="editar">
                        <td @click="editarMembro(membro, index_linha)" class="editar">Editar</td>
                    </template > 
                    <template v-if="desligar">
                        <td @click="desligarMembro(membro, index_linha)" class="desligar">Desligar</td>
                    </template>
                    <template v-if="religar">
                        <td @click="religarMembro(membro, index_linha)" class="religar">Religar</td>
                    </template>
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

.religar:hover{
    background-color: rgb(91, 255, 105) !important;
}

.religar{
    text-align:     center;
    font-weight:    bolder;
    background-color: rgb(149, 241, 157) !important;
    cursor: pointer;
}

</style>