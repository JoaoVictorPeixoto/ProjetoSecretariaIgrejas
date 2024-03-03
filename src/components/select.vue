<script setup>
import {ref, watch, inject} from 'vue'

let props = defineProps({
  label: '',
  type: 'text',
  input_id: '',
  size_label: 1
})

const emit = defineEmits(['updateValue']);

let inputLabel = ref(props.label)
    , limpa_formulario = inject('limpa_formulario')
    , input_value = defineModel('input_value')
    , input_type = ref(props.type)
    , input_id = ref(props.input_id)
;

watch(limpa_formulario, () => {
  if(limpa_formulario.value){
    limpaCampo();
  }
});

// Seta valor do campo para null
function limpaCampo(){
  input_value.value = null;
  changValue();
}

function changValue(){
  let campo = {
    label :  inputLabel.value,
    value :  input_value.value,
    id    :  input_id.value,
  }
  emit('updateValue', campo);
}


</script>

<template>
<div class='form-floating'>
    <select :type="input_type" name="input_text" class='form-select form-select-sm margem' 
    :id="input_id" :placeholder="inputLabel">
        <option selected>''</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
    </select>
    <label :for="input_id">{{ inputLabel }}</label>
</div>
</template> 

<style scoped>
.margem{
  margin: 5px 0px 5px 0px;
}
</style>