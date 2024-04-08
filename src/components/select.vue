<script setup>
import {ref, watch, inject, onMounted} from 'vue'
import style from '../styles/styles';

let props = defineProps({
  label: '',
  id: '',
  size_label: 1,
  options: []
})

const emit = defineEmits(['updateValue']);

let label = ref(props.label)
    , id = ref(props.id)
    , value = defineModel()
    , erro_campo = ''
    , erro_mensagem = style.mensagem_erro.erro_mensagem
    , mensagem_erro = ref('')
;

defineExpose({
  id,
  value,
  erro_campo,
  mensagem_erro,
  label
})

// inject 
let limpa_formulario = inject('limpa_formulario')
  , erro = inject('mensagem_erro')
;

watch(limpa_formulario, () => {
  if(limpa_formulario.value){
    limpaCampo();
  }
});


/**
 * Seta valor 'default' do select, que será o option que possuir a propriedade selected true
 */
onMounted(() => {
    let option = props.options.find(option => {
      return option.selected === true;
    });

    if(option){
      value.value = option.id;
    }

    changValue();
});

// Seta valor do campo para null
function limpaCampo(){
  value.value = null;
  changValue();
}

/**
 * Evento de mudança de valor
 */
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
    <select :onchange="changValue" name="select" class='form-select form-select margem border-dark' :style="erro_campo"
    :id="id" v-model="value">
        <template v-for="option in props.options" :key="option.id">
          <option :disabled="option.disabled" :selected="option.selected" :value="option.id">{{option.value}}</option>
        </template>
        
    </select>
    <label :for="id">{{ label }}</label>
    
</div>
<label :for="id" v-if="!!mensagem_erro" :style="erro_mensagem" >{{ mensagem_erro }}</label>
</template> 

<style scoped>
.margem{
  margin: 5px 0px 5px 0px;
}
</style>