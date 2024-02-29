<script setup>
import { ref, onMounted, provide} from 'vue'
import formulario from './formulario_generico.vue'
import '../styles/formularios.css'
import style from  '../styles/styles'
import utils from '../utilities/interacoes'
import interacoes from '../utilities/interacoes'

let pagina = ref('ficha_membros')
  , furmulario_style = style.class_formulario+' formulario'
  , focus_button_submit = false
  , formulario_value = {}
  , forca_submit = ref(false);
;

provide('forcaSubmit', forca_submit);

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
 * chama função de submit da ficha
 */
function clickSubmit(interacao){
  let pacote = preparaPacote(formulario_value);
  interacoes.interage_server(pacote, interacao);
  forca_submit.value = false;
}

/**
 * Prepara o value do formulario para ser enviado ao server.
 * @param {*} formulario_value 
 */
function preparaPacote(formulario_value){
  let pacote_retorno = {
    sql: {
      fields: [],
      values: []
    }
  };

  // Cria pacote de retorno, com os devidos fields e seus values
  for(let i = 0; i < formulario_value.length; i++) {
    for(let j = 0; j < formulario_value[i].length; j++){
      pacote_retorno.sql.fields.push(formulario_value[i][j].id);

      // caso o campo tenha como value um string vazio '', convertemos em null antes de mandarmos o pacote
      if(formulario_value[i][j].value === ''){
        formulario_value[i][j].value = null;
      }
      
      pacote_retorno.sql.values.push(formulario_value[i][j].value);
    }
  }

  return pacote_retorno;

}

function forcaSubmit(){
  forca_submit.value = true;
}

</script>

<template>  

  <div :class=furmulario_style @keyup.enter="forcaSubmit">
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