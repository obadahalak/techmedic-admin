import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '@/base/http.js'

export const useCertificate = defineStore('certificate', () => {
  const error = ref([])
  const data = ref([])
  const item = ref({})
  const meta = ref({
    current_page: 1,
    last_page: 1,
  })

  async function store(certificate) {
    return await http.post('admin/certificates', certificate).then((response) => {
      data.value.unshift(response.data)

      return response
    }).catch((err) => {
      error.value = err.errors

      return err
    })
  }

  function getAll() {
    http.get(`/certificates?page=${meta.value.current_page}`)
      .then((response) => {
        meta.value = response.meta

        return data.value = response.data
      }).catch((err) => {
        error.value = err.errors
      })
  }

  function get(id) {
    item.value = data.value.find(d => d.id === id)
  }

  async function destroy() {
    return await http.delete(`/admin/certificates/${item.value.id}`).then((response) => {
      data.value.splice(data.value.indexOf(data.value.find(d => d.id === item.value.id)), 1)

      return response
    }).catch((err) => {
      error.value = err.errors

      return err
    })
  }
  function nextPage() {
    if (meta.value.current_page !== meta.value.last_page) {
      meta.value.current_page++
      getAll()
    }
  }
  function prevPage() {
    if (meta.value.current_page !== 1) {
      meta.value.current_page--
      getAll()
    }
  }

  return { data, item, error, meta, getAll, store, get, destroy, nextPage, prevPage }
})
