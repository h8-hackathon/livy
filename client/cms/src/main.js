import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'


import App from './App.vue'
import router from './router'

// import './assets/main.css'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: '10605181570-23qpgdh6vuol4cvp7vmshbsn3262j458.apps.googleusercontent.com'
})

app.use(createPinia())
app.use(router)

app.mount('#app')
