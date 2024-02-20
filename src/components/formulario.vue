<script setup>
import {reactive, ref} from 'vue';
import inputText from './input.vue';
import style from '../styles/styles';
import buttonVue from'./button.vue'

let focus_button = reactive(false);

// Value do formulario
let value = reactive({
  usr_ident: {
    label: '',
    value: '',
    id: '',
  },
  usr_senha: {
    label: '',
    value: '',
    id: '',
  }
})

// eventos proprios do formulario
const emit = defineEmits(['updateFormulario']);

// Classe generica para botões
let btn = style.class_btn;

// Campos do formulario
let usr_ident = defineModel('identificacao')
    , usr_senha = defineModel('senha')
;

// Metodos

// Atualiza o value do formulario e emite o event de chang do formulario.
function changCampos(campo){
  value[campo.id].id = campo.id;
  value[campo.id].label = campo.label;
  value[campo.id].value = campo.value;
  emit('updateFormulario', value);
}

// Chamada quando o campo button receber foco
function focusButton(){
  focus_button = true;

}

// Chamada quando o campo button perde o foco
function blurButton(){
  focus_button = false;

}

function entrarEnter(){
  if(!focus_button){
    emit('entrar');
  }
}

</script>

<template>
  <div class="container" @keyup.enter="entrarEnter">
    <div class="row justify-content-center">
        <div class="col-12">
          <h1 id='titulo'>Login</h1>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-6">
          <inputText @updateValue="changCampos" label="Indentificação" input_id="usr_ident" v-model="usr_ident"/>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-6">
          <inputText @updateValue="changCampos" label="Senha" type="password" input_id="usr_senha" v-model="usr_senha"/>
        </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-md-1">
        <button type="button" :class="btn" @click="$emit('entrar')" @focus="focusButton" @blur="blurButton">Entrar</button>
      </div>
    </div>
  </div>
</template>
    