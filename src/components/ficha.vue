<script setup>
import { ref, onMounted} from 'vue'
import formulario from './formulario_generico.vue'
import '../styles/formularios.css'
import style from  '../styles/styles'
import utils from '../utilities/interacoes'
import interacoes from '../utilities/interacoes'

let pagina = ref('ficha_membros')
  , furmulario_style = style.class_formulario+' formulario'
  , focus_button_submit = false
  , formulario_value = {}
;

// Chamada quando o campo button receber foco
function focusButton(){
  focus_button_submit = true;

}

// Chamada quando o campo button perde o foco
function blurButton(){
  focus_button_submit = false;

}

/**
 * atualiza o valor do formulario
 */
function updateFormulario(value){
  formulario_value = value;
}

/**
 * chama função de submit do ficha
 */
function clickSubmit(interacao){
  interacoes.interage_server(formulario_value, interacao);
}

</script>

<template>  

  <div :class=furmulario_style @keyup.enter="alert(true)">
    <formulario 
      :pagina="pagina"
      @focusButton="focusButton"
      @blurButton="blurButton"
      @clickButtonSubmit="clickSubmit"
      @updateFormulario="updateFormulario"
    />
  </div>

</template>

<style>

</style>