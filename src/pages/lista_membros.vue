<script setup>
import navBar from '../components/navbar.vue'
import tableExt from '../components/table.vue'
import "../styles/formularios.css";
import style from "../styles/styles";

let furmulario_style = style.class_formulario + " formulario";

</script>

<template>
    
    <navBar />
    <div :class="furmulario_style">
        <h1 style="text-align: center">Teste Lista Membros</h1>
        <tableExt/>
    </div>

</template>

<style>

</style>