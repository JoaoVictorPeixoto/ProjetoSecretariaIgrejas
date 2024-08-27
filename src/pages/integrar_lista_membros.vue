<script setup>
import navBar from '../components/navbar.vue'
import "../styles/formularios.css";
import style from "../styles/styles";
import {ref} from 'vue'
import interacoes from "../utilities/interacoes";
import {reactive} from 'vue';

let file = reactive(null);

let furmulario_style = style.class_formulario + " formulario";

// chama interação com o server
async function input(event){
    let arquivo = file.files[0];

    if (arquivo) {
        await this.interacoes.uploadFile(arquivo);
    }
}

</script>

<template>
    
    <navBar />
    <div :class="furmulario_style">
        <h1 style="text-align: center">Integração de membros</h1>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-6">
                    <label for="formFile" class="form-label">Lista de membros</label>
                    <input class="form-control" type="file" id="formFile" @input="input($event)" ref="file">
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>