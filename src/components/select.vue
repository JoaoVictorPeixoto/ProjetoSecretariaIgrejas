<script setup>
import {ref, watch, inject, onMounted} from 'vue'

let props = defineProps({
  label: '',
  id: '',
  size_label: 1,
  options: []
})

const emit = defineEmits(['updateValue']);

let label = ref(props.label)
    , limpa_formulario = inject('limpa_formulario')
    , id = ref(props.id)
    , value = defineModel()
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
  }
  emit('updateValue', campo);
}


</script>

<template>
<div class='form-floating'>
    <select :onchange="changValue" name="select" class='form-select form-select margem border-dark input' 
    :id="id" v-model="value">
        <template v-for="option in props.options" :key="option.id">
          <option :disabled="option.disabled" :selected="option.selected" :value="option.id">{{option.value}}</option>
        </template>
        
    </select>
    <label :for="id">{{ label }}</label>
    
</div>
</template> 

<style scoped>
.margem{
  margin: 5px 0px 5px 0px;
}
</style>