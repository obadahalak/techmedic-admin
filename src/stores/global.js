import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobal = defineStore('global', () => {
  const loading = ref(false)

  function setloading(value) {
    loading.value = value
  }

  return { setloading, loading }
})
