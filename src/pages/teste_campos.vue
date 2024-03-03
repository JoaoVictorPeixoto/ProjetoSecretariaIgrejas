<script setup>
import selectExt from '../components/select.vue'
import navBar from '../components/navbar.vue'
import style from '../styles/styles'

let formulario_css = style.class_formulario

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

</script>

<template>
    <navBar />
    <h1>Reintegração</h1>

    <div :class="formulario_css"> 
        <selectExt label="teste" :options="options"/>
    </div>
    

</template>

<style>

</style>