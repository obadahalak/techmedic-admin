import './style.css'
import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import {  createPinia } from 'pinia';
import { initFlowbite } from 'flowbite'


const app = createApp(App)
const pinia = createPinia();



app.use(router)
app.use(pinia);
app.use(initFlowbite());
app.use(createPinia())

// function isEmpty(value) {
//     return value === null || value === undefined || value === '';
//   }
  
  app.config.globalProperties.isEmpty = 'asdasda';
app.mount('#app')
