<script setup>
import { reactive, ref, inject, watch} from 'vue'
import style from '../styles/styles';

// Classe generica para botões
let btn = style.class_btn;

let force_submit = inject('forcaSubmit');

watch(force_submit, () => {
  if(force_submit.value && props.button_submit){
    click();
  }
});

let props = defineProps({
  label: '',
  button_id: '',
  button_submit: false,
  button_interacao: ''
})

const emit = defineEmits(['clickButton', 'focusButton', 'blurButton']);

function click(){
    emit('clickButton', props.button_id, props.button_submit, props.button_interacao);
}

function focusButton(){
    emit('focusButton');
}


function blurButton(){
    emit('blurButton');
}

</script>

<template>
<div class='form-floating'>
    <button :class="btn" :id="props.button_id" @click="click" @focus="focusButton" @blur="blurButton">{{props.label}}</button>
</div>
</template> 

<style scoped>
.input{
  margin: 5px 0px 5px 0px;
}
</style>