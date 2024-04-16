<script setup>
import { ref, provide, reactive, onMounted} from "vue";
import formulario from "./formulario_generico.vue";
import "../styles/formularios.css";
import style from "../styles/styles";
import alerta from "../components/alertas";
import interacoes from "../utilities/interacoes";
import {useRouter} from 'vue-router';

// paremetros do pai
let props = defineProps(['enviar_id']);

const router = useRouter();

let pagina = ref("ficha_membros"),
  furmulario_style = style.class_formulario + " formulario",
  focus_button_submit = false,
  formulario_value = {},
  forca_submit = ref(false),
  limpa_formulario = ref(false),
  mensagem_erro = reactive({ mensagem: "", campo_id: "", erro: false })
;

// Componente filho
const formulario_componente = ref(null);

// provide
provide("forcaSubmit", forca_submit);
provide("limpa_formulario", limpa_formulario);
provide("mensagem_erro", mensagem_erro);

/**
 * Caso seja indicado outra pagina pelo componente pai, substitui o dafault
 */
onMounted(async () => {
  if(props.pagina){
    pagina = props.pagina;
  }
});

// Chamada quando o campo button receber foco
function focusButton() {
  focus_button_submit = true;
}

// Chamada quando o campo button perde o foco
function blurButton() {
  focus_button_submit = false;
}

/**
 * atualiza o valor do formulario
 */
function updateFormulario(value) {
  formulario_value = value;
}

/**
 * chama função de submit da ficha
 */
async function clickSubmit(interacao) {
  limpa_formulario.value = false;
  let pacote = preparaPacote(formulario_value)
    , name_route = router.currentRoute.value.name
  ;

  if (!pacote.erro) {
    // informa qual é a pagina
    pacote.pagina = 'ficha_membros';
    pacote.comando = name_route === 'editar_membro' ? 'update' : 'insert';

    let retorno = await interacoes.interage_server(pacote, interacao);
    processaRetornoPacote(retorno);
  } else {
    new alerta().emiteAlerta(pacote.mensagem_erro, "error", 2000);
  }
}

/**
 * Prepara o value do formulario para ser enviado ao server.
 * @param {*} formulario_value
 */
function preparaPacote(formulario_value) {
  let pacote_retorno = {
    sql: {
      fields: [],
      values: [],
    },
    campos: []
  };

  // Cria pacote de retorno, com os devidos fields e seus values
  for (let i = 0; i < formulario_value.length; i++) {
    for (let j = 0; j < formulario_value[i].length; j++) {
      pacote_retorno.sql.fields.push(formulario_value[i][j].id);

      // caso o campo tenha como value um string vazio '', convertemos em null antes de mandarmos o pacote
      if (formulario_value[i][j].value === "") {
        formulario_value[i][j].value = null;
      }

      // Caso exista algum campo com erro, aborta envio de pacote
      if (
        formulario_value[i][j].erro !== "" &&
        formulario_value[i][j].erro !== undefined
      ) {
        pacote_retorno.erro = true;
        pacote_retorno.mensagem_erro = formulario_value[i][j].erro || "Campos com erros!";
      }

      pacote_retorno.sql.values.push(formulario_value[i][j].value);
      pacote_retorno.campos.push(formulario_value[i][j]);
    }
  }

  // adiciona possivel id do membro que está sendo editado para o serve
  if(props.enviar_id){
    pacote_retorno.id = sessionStorage.getItem('meb_id');
    pacote_retorno.sql.chave_where = 'meb_id';
  }

  return pacote_retorno;
}

/**
 * Processa um pacote enviado do serve para o client
 */
function processaRetornoPacote(pacote) {
  forca_submit.value = false;

   // caso exista uma entrada no pacote de campos, processa essa entrada, com as suas respectivas mensagens de erro
  if(pacote.campos !== null && pacote.campos !== undefined){
    for (let i = 0; i < pacote.campos.length; i++) {
      const campo_serve = pacote.campos[i];

      if(campo_serve.erro){
        let tipo_campo = campo_serve.type === 'select' ? 'select' : 'input'
          , campo_index 
        ;
          
        formulario_componente.value.campos.forEach((campo, index) => {
          if(campo[tipo_campo] && (campo[tipo_campo].id === campo_serve.id)){
            campo_index = index;
            return;
          }
        });

        formulario_componente.value.campos[campo_index][tipo_campo].mensagem_erro = campo_serve.mensagem;
      }
      
    }
  }

  let name_route = router.currentRoute.value.name
    , mensagem = pacote.erro ? pacote.mensagem  : name_route === 'editar_membro' ? 'Membro editado com sucesso!' : 'Membro inserido com Sucesso'
    , tipo = pacote.erro ? "error" : "success"
  ;
  new alerta().emiteAlerta(mensagem, tipo, 2000);

  if (!pacote.erro && name_route !== 'editar_membro') {
      limpa_formulario.value = true;
  }

}

function forcaSubmit() {
  if (!focus_button_submit) {
    forca_submit.value = true;
  }
}

defineExpose({
  formulario_componente
})
</script>

<template>
  <div :class="furmulario_style" @keyup.enter="forcaSubmit">
    <formulario
      ref="formulario_componente"
      :pagina="pagina"
      @focusButton="focusButton"
      @blurButton="blurButton"
      @clickButtonSubmit="clickSubmit"
      @updateFormulario="updateFormulario"
    />
  </div>
</template>

<style></style>
