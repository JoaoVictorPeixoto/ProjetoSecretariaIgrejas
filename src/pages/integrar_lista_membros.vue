<script setup>
import navBar from '../components/navbar.vue'
import "../styles/formularios.css";
import style from "../styles/styles";
import interacoes from "../utilities/interacoes";
import {reactive, ref} from 'vue';

let file = ref(null);
let btn = style.class_btn + 'mt-2';


let furmulario_style = style.class_formulario + " formulario";

// chama o server para processar a integração de membro
async function integraMembros(){
    if (file.value) {
        let arquivo = file.value.files[0];

        if (arquivo) {
            let res = await this.interacoes.uploadFile(arquivo);
            
            await this.interacoes.interage_server({file_path: res.file_path}, 'integraListaMembros');
        }
    }
}

</script>

<template>
    
    <navBar />
    <div :class="furmulario_style">
        <h1 style="text-align: center">Integração de membros</h1>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="mb-3">
                    <label for="formFile" class="form-label">Lista de membros</label>
                    <input class="form-control" type="file" id="formFile" ref="file" accept=".txt,.xlsx">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="integraMembros()">Processar</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style>

</style>