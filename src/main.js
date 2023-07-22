import './style.css'
import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import {  createPinia } from 'pinia';


const app = createApp(App)
const pinia = createPinia();



app.use(pinia);
app.use(router);
app.use(createPinia())

app.mount('#app')
