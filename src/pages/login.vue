<script setup>
import fomulario from '../components/formulario.vue'
import login from '../utilities/login';
import {reactive, ref} from 'vue';
import alerta from '../components/alertas'
import 'vue3-toastify/dist/index.css'
import { useRouter, onBeforeRouteLeave} from 'vue-router'

let formulario_value = reactive({});
const router = useRouter();
let usuario_validado = false;

onBeforeRouteLeave (async (to, from) => {
  sessionStorage.setItem('usuario_validado', usuario_validado);
});


// Envia o os campos de identificação e senha do formulario para a validação em banco.
async function entrar(){
  //  Pegamos o valor dos campos do formulario ou null, caso ainda não tenha sido preenchidos.
  let usr_ident = formulario_value.usr_ident?.value || null;
  let usr_senha = formulario_value.usr_senha?.value || null;

  let res = await login.entrar(usr_ident, usr_senha); 
  
  new alerta().emiteAlerta(res.mensagem, res.erro ? 'error' : 'success', 1500);

  if(!res.erro){
    usuario_validado = true;
    setTimeout(() => {
      router.push('/home');
    }, "2000");
    
  }

}

function changFormulario(value){
  formulario_value = value;
}

</script>

<template>
  <div id='login' class="container-sm position-absolute top-50 start-50 translate-middle gray text-center p-5 w-75">
    <fomulario 
      @entrar="entrar"
      @registrar="registrar"
      v-model="value_formulario"
      @updateFormulario="changFormulario"
    />
  </div> 
</template>

<style>
.gray{
  background-color: rgb(155, 155, 155);
}
</style>
