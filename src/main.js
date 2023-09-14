import './style.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Notifications from '@kyvg/vue3-notification'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(Notifications)
app.use(router)
app.use(createPinia().use(piniaPluginPersistedstate))

app.mount('#app')
