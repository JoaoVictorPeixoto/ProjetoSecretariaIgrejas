<script setup>
import campo_input from './input.vue';
import buttonExt from './button.vue'
import {onMounted, ref} from 'vue'
let campo_input_visivel = ref(false)
    , campo_button_visivel = ref(false)
;
const prop = defineProps(['params', 'tipo_campo']);
const emit = defineEmits(['changCampo']);

let tipo_campo = prop.tipo_campo
        , params = prop.params
    ;

onMounted(() => {
    switch(tipo_campo){
        case 'text':
        case 'password':
        case 'date':
        case 'number':
            campo_input_visivel.value = true;
            campo_button_visivel.value = false
            break;
        case 'button':
            campo_input_visivel.value = false;
            campo_button_visivel.value = true
            break;
    }
});

function updateValue(campo){
    emit('changCampo', campo);
}

</script>

<template>
    <campo_input @updateValue="updateValue" :label="params.label" :type="params.type" :input_id="params.id" v-if="campo_input_visivel" :size_label="params.size_label"/>
    <buttonExt :label="params.label" :button_id="params.id" :button_submit="params.submit" :button_interacao="params.interacao" v-if="campo_button_visivel"
         @focusButton="$emit('focusButton')"
         @blurButton="$emit('blurButton')"
         @clickButton="(id, submit_button, interacao) => {$emit('clickButton', id, submit_button, interacao)}"
    />
</template>

<style>


</style>