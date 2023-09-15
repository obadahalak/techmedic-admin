import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCategory } from './category'
import http from '@/base/http.js'

export const useCompany = defineStore('company', () => {
  // eslint-disable-next-line prefer-const
  let error = ref([])
  const data = ref([])
  const item = ref({})
  const meta = ref({
    current_page: 1,
    last_page: 1,
  })
  const status = ref(false)

  function store(company) {
    http.post('admin/companies', company).then((response) => {
      data.value.unshift(response.data)
    }).catch((err) => {
      error.value = err.errors
    })
  }

  function all() {
    http.get('/admin/companies/all')

      .then((response) => {
        data.value = response.data

        return useCategory().all(data.value[0].id)
      }).catch((error) => {
        error.value = error.response.data.errors
      })
  }
  function getAll() {
    http.get(`/companies?page=${meta.value.current_page}`)
      .then((response) => {
        meta.value = response.meta

        return data.value = response.data
      }).catch((error) => {
        error.value = error.response.data.errors
      })
  }

  function get(id) {
    item.value = data.value.find(d => d.id === id)
  }

  async function edit(form) {
    return await http.post(`/admin/companies/edit/${item.value.id}`, form)
      .then((response) => {
        if (data.value.find(d => d.id === item.value.id))

          item.value.name = response.data.name
        item.value.logo = response.data.logo

        return response
      }).catch((err) => {
        error.value = err.errors

        return err
      })
  }
  async function destroy() {
    return await http.delete(`/admin/companies/${item.value.id}`).then((response) => {
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

  return { data, item, error, status, meta, all, getAll, store, edit, get, destroy, nextPage, prevPage }
})
