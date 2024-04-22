import { createRouter, createWebHistory } from 'vue-router'
import login from '../pages/login.vue'
import uniao_membro from '../pages/uniao_membro.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home.vue')
    },
    {
      path: '/uniao',
      name: 'unidao_membro',
      component: () => import('../pages/uniao_membro.vue')
    },
    {
      path: '/reintegracao',
      name: 'reintegracao_membro',
      component: () => import('../pages/reintegracao.vue')
    },
    {
      path: '/testeCampos',
      name: 'teste_campos',
      component: () => import('../pages/teste_campos.vue')
    },
    {
      path: '/listaMembros',
      name: 'lista_membros',
      component: () => import('../pages/lista_membros.vue')
    },
    {
      path: '/editarMembro',
      name: 'editar_membro',
      component: () => import('../pages/editar_membro.vue')
    },
    
    
  ]
})

router.beforeResolve((to, from) => {

  let usr_validado =  sessionStorage.getItem('usuario_validado') === 'true' ? true : false;

  // Caso a rota esteja indo para login, exclui o cookie de usuario validado
  if(to.name === 'login'){
    sessionStorage.removeItem('usuario_validado');
  }

  // Caso o from seja uma rota, que não esteja no nosso controle ou o usuario não esteja validado, barra o acesso.
  if(!usr_validado && to.name !== 'login'){
   return {path: '/'};
  }
})

function getRotas(){
  return router.getRoutes();
}

export default router
