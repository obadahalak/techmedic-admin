/* eslint-disable prefer-const */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '@/base/http.js'

export const useCategory = defineStore('category', () => {
  let error = ref([])
  const data = ref([])
  let item = ref({})
  const meta = ref({
    current_page: 1,
    last_page: 1,
  })
  const status = ref(false)

  function store(category) {
    http.post('admin/categories', category).then((response) => {
      data.value.unshift({
        id: response.data.id,
        category_name: response.data.name,
        company_name: response.data.company.name,
      })
    }).catch((err) => {
      error.value = err.errors
    })
  }

  function getAll() {
    http.get(`/admin/categories/?page=${meta.value.current_page}`)
      .then((response) => {
        meta.value = response.meta
        data.value = response.data
      }).catch((err) => {
        error.value = err.errors
      })
  }

  function all(id) {
    http.get(`/admin/categories/all/?company_id=${id}`)
      .then((response) => {
        data.value = response.data
      }).catch((err) => {
        error.value = err.errors
      })
  }

  function get(id) {
    item.value = data.value.find(d => d.id === id)
  }

  async function edit(category_name) {
    return await http.post(`/admin/categories/edit/${item.value.id}`, { name: category_name.value })
      .then((response) => {
        if (data.value.find(d => d.id === item.value.id))

          item.value.category_name = response.data.name

        return response
      }).catch((err) => {
        error.value = err.errors

        return err
      })
  }
  async function destroy() {
    return await http.delete(`/admin/categories/${item.value.id}`).then((response) => {
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
