import '../node_modules/bootstrap/scss/bootstrap.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/scss/bootstrap-utilities.scss'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import './styles/formularios.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
