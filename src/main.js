import './style.css'
import App from './App.vue'
import router from './router'
// import Notify from 'simple-notify'
// import 'simple-notif`y/dist/simple-notify.min.css'

import Notifications from '@kyvg/vue3-notification'

import { createApp } from 'vue'
import {  createPinia } from 'pinia';


const app = createApp(App)
const pinia = createPinia();



app.use(pinia);

app.use(Notifications);
app.use(router);
app.use(createPinia())

app.mount('#app')
