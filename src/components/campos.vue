<script setup>

import campo_input from './input.vue';
import buttonExt from './button.vue'
import selectExt from './select.vue'
import {onMounted, ref} from 'vue'

let campo_input_visivel = ref(false)
    , campo_button_visivel = ref(false)
    , campo_select_visivel = ref(false)
;

const prop = defineProps(['params', 'tipo_campo']);
const emit = defineEmits(['changCampo']);
const input = ref(null)
    , select = ref(null)
;

let tipo_campo = prop.tipo_campo
    , params = prop.params
    , value = ref(null)
;

onMounted(() => {
    switch(tipo_campo){
        case 'text':
        case 'password':
        case 'date':
        case 'number':
            campo_input_visivel.value = true;
            campo_button_visivel.value = false;
            campo_select_visivel.value = false;
            break;
        case 'button':
            campo_input_visivel.value = false;
            campo_button_visivel.value = true;
            campo_select_visivel.value = false;
            break;
        case 'select':
            campo_select_visivel.value = true;
            campo_input_visivel.value = false;
            campo_button_visivel.value = false;
            break;
    }
});

function updateValue(campo){
    value.value = campo.value;
    emit('changCampo', campo);
}

defineExpose({
    select,
    input
})

</script>

<template>
    <campo_input ref="input" @updateValue="updateValue" :label="params.label" :type="params.type" :input_id="params.id" v-if="campo_input_visivel" :size_label="params.size_label" v-model="value" :disabled="params.disabled"/>
    <buttonExt :label="params.label" :button_id="params.id" :button_submit="params.submit" 
        :button_interacao="params.interacao" v-if="campo_button_visivel && !params.hidden"
        @focusButton="$emit('focusButton')"
        @blurButton="$emit('blurButton')"
        @clickButton="(id, submit_button, interacao) => {$emit('clickButton', id, submit_button, interacao)}"
    />
    <selectExt
        ref="select"
        @updateValue="updateValue" :label="params.label" :id="params.id"
        v-model="value" :size_label="params.size_label" :options="params.options"
        v-if="campo_select_visivel" :disabled="params.disabled"
    />
</template>

<style>


</style>