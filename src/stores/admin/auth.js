import { defineStore } from "pinia";
import http from '@/base/http.js';
import router from '../../router';
export const useAuth = defineStore('auth', {
  state: () => ({
    'token': localStorage.getItem('token') ?? null,
    'email': localStorage.getItem('email') ?? null,
    'error': ''
  }),
  actions: {
    login(credentials) {

      http.post('/admin/login', {
        'email': credentials.email,
        'password': credentials.password
      }).then((response) => {
        this.token = response.data.data.token
        this.email = response.data.data.email

        localStorage.setItem('token', this.token)
        localStorage.setItem('email', response.data.data.email)

        router.push('/company');
      });
    },


    update(data) {
     
      http.post('/admin/update', data).then((response) => {
        this.token = response.data.data.token
        //  you dont use token 
        localStorage.setItem('token', this.token)
        router.push('/company');
      });
    }
  }
});