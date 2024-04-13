<script setup>
import { useRouter} from 'vue-router'

// instancia do router
const router = useRouter();

// props
const props = defineProps(['closeLink']);

function fechar(){

  let pagina = props.closeLink ? props.closeLink : '/home'
  
  router.push(pagina);

  
}

function redirecionar(path){
  router.push(path);
}

</script>

<template>
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
        <div class="container-fluid">
          <span class="navbar-brand">Secretaria</span>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Membros
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click="redirecionar('listaMembros')">Listas de Membros</a></li>
                  <li><a class="dropdown-item"  @click="redirecionar('uniao')">União de Membros</a></li>
                  <li><a class="dropdown-item"  @click="redirecionar('reintegracao')">Reintegração de membro</a></li>
                  <li><a class="dropdown-item" href="#">Falecimento</a></li>
                  <li><a class="dropdown-item" href="#">Suspensão</a></li>
                  <li><a class="dropdown-item"  @click="redirecionar('testeCampos')">teste campos</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page">Relatorio</a>
              </li>
            </ul>
            <form class="d-flex">
              <button type="button" class="btn-close" aria-label="Close" @click="fechar"></button>
            </form>
          </div>
        </div>
    </nav>
</template>

<style scoped>

</style>
