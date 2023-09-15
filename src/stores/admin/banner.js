import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '@/base/http.js'

export const useBanner = defineStore('banner', () => {
  const error = ref([])
  const data = ref([])
  const item = ref({})
  const meta = ref({
    current_page: 1,
    last_page: 1,
  })

  function store(banner) {
    http.post('admin/slider-images', banner).then((response) => {
      response.data.map((b) => {
        return data.value.unshift({ id: b.id, src: `${import.meta.env.VITE_BASE_URL_IMAGE}${b.path}` })
      })
    }).catch((err) => {
      error.value = err.errors
    })
  }

  function getAll() {
    http.get(`/slider-images?page=${meta.value.current_page}`)
      .then((response) => {
        data.value = response.data
      })
  }

  function get(id) {
    item.value = data.value.find(d => d.id === id)
  }

  async function destroy() {
    return await http.delete(`/admin/slider-images/${item.value.id}`).then((response) => {
      data.value.splice(data.value.indexOf(data.value.find(d => d.id === item.value.id)), 1)

      return response
    }).catch((err) => {
      error.value = err.errors

      return err
    })
  }

  return { data, item, error, meta, getAll, store, get, destroy }
},

)
