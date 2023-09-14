/* eslint-disable prefer-const */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '@/base/http.js'

export const useProduct = defineStore('product', () => {
  const error = ref([])
  let data = ref([])
  const item = ref({})
  const meta = ref({
    current_page: 1,
    last_page: 1,
  })

  async function store(product) {
    return await http.post('admin/products', product).then((response) => {
      const res = response.data

      data.value.unshift({
        id: res.id,
        name: res.name,
        description: res.description,
        price: res.price,
        image: res.images[0].src,
        company: res.company.name,
        category: res.category.name,
      })

      return response
    }).catch((err) => {
      error.value = err.errors

      return err
    })
  }

  function getAll() {
    http.get(`/products?page=${meta.value.current_page}`)
      .then((response) => {
        meta.value = response.meta
        data.value = response.data
      }).catch((err) => {
        error.value = err.errors
      })
  }

  function get(id) {
    item.value = data.value.find(d => d.id === id)
  }

  async function edit(product) {
    return await http.post(`/admin/products/edit/${item.value.id}`, { price: product }).then((response) => {
      if (data.value.find(d => d.id === item.value.id))
        item.value.price = product

      return response
    }).catch((err) => {
      error.value = err.errors

      return err
    })
  }
  function destroy() {
    http.delete(`/admin/products/${item.value.id}`).then((response) => {
      data.value.splice(data.value.indexOf(data.value.find(d => d.id === item.value.id)), 1)
    }).catch((err) => {
      error.value = err.errors
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

  return { data, item, error, meta, edit, getAll, store, get, destroy, nextPage, prevPage }
})
