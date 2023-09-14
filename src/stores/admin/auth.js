import { defineStore } from 'pinia'
import { ref } from 'vue'

import router from '../../router'

import http from '@/base/http.js'

export const useAuth = defineStore('auth', () => {
  const token = ref()
  const error = ref()

  function login(credentials) {
    http.post('/admin/login', credentials).then((response) => {
      token.value = response.data.token

      router.go('/')
    }).catch((err) => {
      error.value = err.errors
    })
  }

  function update(data) {
    http.post('/admin/update', data).then((response) => {
      return router.back()
    }).catch((err) => {
      error.value = err.errors
    })
  }

  return { token, error, update, login }
},
{
  persist: [
    {
      paths: ['token'],
      storage: localStorage,
    },
  ],
})
