import axios from 'axios'
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

import isAuthenticated from '../composables/isAuthenticated.js'

import { useGlobal } from '@/stores/global'

const createInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,

  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },

})

createInstance.interceptors.request.use((config) => {
  useGlobal().setloading(true)
  if (isAuthenticated)

    config.headers.Authorization = `Bearer ${isAuthenticated}`

  return config
})

createInstance.interceptors.response.use((response) => {
  useGlobal().setloading(false)

  return response.data
}, (error) => {
  useGlobal().setloading(false)

  if (error.response.status === 500) {
    new Notify({
      status: 'error',
      title: 'Error from server.',
      text: 'please try again',
      autoclose: true,
      position: 'right bottom',
    })
  }

  return Promise.reject(error.response.data)
})

export default createInstance
