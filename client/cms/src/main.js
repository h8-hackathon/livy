import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'


import App from './App.vue'
import router from './router'

// import './assets/main.css'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: '10605181570-23qpgdh6vuol4cvp7vmshbsn3262j458.apps.googleusercontent.com'
})

const pinia = createPinia()

app.use(pinia)
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(router)

app.mount('#app')
