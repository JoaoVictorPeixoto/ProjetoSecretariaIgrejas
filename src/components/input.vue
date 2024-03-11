<script setup>
import {ref, watch, inject} from 'vue'
import style from '../styles/styles';

let props = defineProps({
  label: '',
  type: 'text',
  input_id: '',
  size_label: 1
})

const emit = defineEmits(['updateValue']);

let label = ref(props.label)
    , limpa_formulario = inject('limpa_formulario')
    , value = defineModel('input_value')
    , type = ref(props.type)
    , id = ref(props.input_id)
    , mensagem_erro = ref('')
    , classe = 'form-control form-control-md border-dark input'
    , erro_campo = ''
    , erro_mensagem = style.mensagem_erro.erro_mensagem
;

watch(limpa_formulario, () => {
  if(limpa_formulario.value){
    limpaCampo();
  }
});

watch(mensagem_erro, () => {
  if(!!mensagem_erro.value){
    erro_campo = style.mensagem_erro.erro_campo
  } else {
    erro_campo = ''
  }
});

// Seta valor do campo para null
function limpaCampo(){
  value.value = null;
  changValue();
}

function changValue(){
  let campo = {
    label :  label.value,
    value :  value.value,
    id    :  id.value,
    erro  :  mensagem_erro.value 
  }
  mensagem_erro.value = '';

  emit('updateValue', campo);
  
}


</script>

<template>
<div class='form-floating'>
    <input :type="type" name="input_text" :class="classe" :style="erro_campo" v-model="value" @input="changValue" :id="id" :placeholder="label">
    <label :for="id">{{ label }}</label>
</div>
<label :for="id" v-if="!!mensagem_erro" :style="erro_mensagem" >{{ mensagem_erro }}</label>
</template> 

<style scoped>
.input{
  margin: 5px 0px 5px 0px;
}

</style>