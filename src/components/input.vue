<script setup>
import { reactive, ref } from 'vue'

let props = defineProps({
  label: '',
  type: 'text',
  input_id: '',
  size_label: 1
})

let class_label = ref(`label fs-${props.size_label}`);
const emit = defineEmits(['updateValue']);

let inputLabel = ref(props.label)
    , inputValue = defineModel()
    , input_type = ref(props.type)
    , input_id = ref(props.input_id)
;

function changValue(){
  let campo = {
    label :  inputLabel.value,
    value :  inputValue.value,
    id    :     input_id.value,
  }
  emit('updateValue', campo);
}


</script>

<template>
<div class='form-floating'>
    <input :type="input_type" name="input_text" class='form-control form-control-md border-dark input' v-model="inputValue" @input="changValue" :id="input_id" :placeholder="inputLabel">
    <label :for="input_id">{{ inputLabel }}</label>
</div>
</template> 

<style scoped>
.input{
  margin: 5px 0px 5px 0px;
}
</style>