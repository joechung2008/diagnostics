import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import reportWebVitals from './reportWebVitals'

createApp(App).use(vuetify).mount('#app')

reportWebVitals(console.log)
