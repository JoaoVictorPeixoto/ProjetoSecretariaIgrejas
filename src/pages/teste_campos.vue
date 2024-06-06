<script setup>
import selectExt from '../components/select.vue'
import navBar from '../components/navbar.vue'
import style from '../styles/styles'
import {reactive, onMounted, ref} from 'vue';

let formulario_css = style.class_formulario
let file = ref(null);

let options = [
    {
        id: 'M',
        value: 'Masculino'
    },
    {
        id: 'F',
        value: 'Feminino'
    },
    {
        id: 4,
        value: 'Selecione uma opção',
        selected: true,
        disabled: true
    },
]

function input(event){
    window.alert('opa');
}

</script>

<template>
    <navBar />
    <h1>Reintegração</h1>

    <div :class="formulario_css"> 
        <selectExt label="teste" :options="options"/>
    </div>
    
    <div class="red">
        bla bla
    </div>

    <div class="mb-3">
        <label for="formFile" class="form-label">Exemplo de campo file</label>
        <input class="form-control" type="file" id="formFile" @input="input($event)" ref="file">
        
    </div>

</template>

<style>
.red{
    background-color: red;
    width: 80vw;
}
</style>