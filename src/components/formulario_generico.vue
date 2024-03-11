<script setup>
import {reactive, onMounted} from 'vue';
import carregamentoPaginas from '../utilities/carregamento_paginas'
import style from '../styles/styles';
import campo from './campos.vue'

// campos e botões do formulario
let rows_campos = reactive([])
    , rows_buttons = reactive([])
;

// eventos proprios do formulario
const emit = defineEmits(['updateFormulario', 'clickButtonSubmit']);

// Campos do formulario
let props = defineProps(['pagina']);

// Metodos
onMounted(async () => {
    let campos =  await new carregamentoPaginas().buscaInfoPag(props.pagina, 'carregaCampos', 'campos')
        , buttons = await new carregamentoPaginas().buscaInfoPag(props.pagina, 'carregaButtons', 'buttons')
    ; 
    let controle_size = 0
       ,  row = []
    ;

    for (let index = 0; index < campos.length; index++) {
        controle_size += campos[index].size;
        if(controle_size <= 12 && !campos[index].breakline){
            row.push(campos[index]);
        } else {
            rows_campos.push(row);
            row = [];
            row.push(campos[index])
            controle_size = campos[index].size;
        }
        
    }

    for (let index = 0; index < buttons.length; index++) {
        rows_buttons.push(buttons[index]);
        
    }

    if(controle_size <= 12){
        rows_campos.push(row);
    }
});

// Enter do teclado
function clickButton(id, button_submit, interacao){
    if(button_submit){
        emit('clickButtonSubmit', interacao);
    }
}

// Atualiza o value do formulario e emite o event de chang do formulario.
function changCampos(campo){
    for (let i = 0; i < rows_campos.length; i++) {
        for(let j = 0; j < rows_campos[i].length ; j++){
            if(rows_campos[i][j].id === campo.id){
                rows_campos[i][j].id = campo.id;
                rows_campos[i][j].label = campo.label;
                rows_campos[i][j].value = campo.value;
                rows_campos[i][j].erro = campo.erro;
            }
        }
    }
    
  emit('updateFormulario', rows_campos);
}

</script>

<template>
    <div class="row" v-for="(row, index) in rows_campos" :key="row.id" :index="index">
        <template v-for="campo in rows_campos[index]" :key="campo.id">
            <div :class="'col-'+campo.size">
                <campo 
                    :tipo_campo="campo.type"
                    :params="campo"
                    @changCampo="changCampos"
                    @clickButton="clickButton"
                />
            </div>
        </template>
    </div>
    <div class="d-flex flex-row-reverse mt-5">
        <template v-for="button in rows_buttons" :key="button.id">
            <div :class="'col-'+button.size+' d-flex align-items-end'">
                <campo
                    :tipo_campo="button.type"
                    :params="button"
                    @focusButton="$emit('focusButton')"
                    @blurButton="$emit('blurButton')"
                    @clickButton="clickButton"
                />
            </div>
        </template>
    </div>
</template>
    